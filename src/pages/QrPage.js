import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { ReactComponent as QrIcon } from "assets/images/qr.svg";
import { ReactComponent as Back } from "assets/images/back-white.svg";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
const QrScanPage = () => {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [qrCodeMessage, setQrCodeMessage] = useState("");

    useEffect(() => {
        const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
                setQrCodeMessage(result.data);
                if (result.data.indexOf("syluv") === 0) {
                    qrScanner.stop();
                    const params = new URLSearchParams(
                        result.data.split("?")[1]
                    );
                    const marketId = params.get("marketId");
                    const storeId = params.get("storeId");

                    if (marketId && storeId) {
                        qrScanner.stop();

                        syluvAxios
                            .post(`/home/${storeId}/qrvisit`)
                            .then.catch.finally(() => {
                                navigate(`/market/${marketId}/${storeId}`);
                            });
                    }
                }
            },
            {
                highlightCodeOutline: true,
            }
        );

        qrScanner.start();

        return () => {
            qrScanner.stop();
        };
    }, []);

    return (
        <Container>
            <Header>
                <Back
                    onClick={() => {
                        navigate(-1);
                    }}
                    cursor={"pointer"}
                />
                <div className="title">가게 스캔</div>
                <span className="space" />
            </Header>
            <Overlay />
            <Hole />
            <Camera ref={videoRef} />
            <Text>
                <QrIcon />
                가게의 QR코드를 스캔해주세요
            </Text>
        </Container>
    );
};

const Header = styled.div`
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 440px;
    height: 52px;

    padding: 0 20px;

    .title {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: white;
    }

    .space {
        width: 24px;
        height: 24px;
    }

    @media (max-width: 480px) {
        width: calc(100vw - 40px);
    }
`;

const Container = styled.div`
    height: 100vh;
    width: 480px;
    position: relative;

    @media (max-width: 480px) {
        width: 100dvw;
    }
`;

const Camera = styled.video`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;

const Hole = styled.div`
    z-index: 3;

    aspect-ratio: 1/1;
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.color.primary};

    width: 85%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Overlay = styled.div`
    z-index: 2;

    width: 85%;

    aspect-ratio: 1/1;
    border-radius: 414px;
    border: 400px solid rgba(0, 0, 0, 0.8);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Text = styled.div`
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;

    z-index: 4;
    display: flex;
    gap: 4px;

    top: 73%;
    left: 50%;
    transform: translate(-50%, 50%);

    color: white;
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
export default QrScanPage;
