import React, { useCallback, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { ReactComponent as QrIcon } from "assets/images/qr.svg";
import { ReactComponent as Back } from "assets/images/back-white.svg";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import ButtonModal from "components/Common/ButtonModal";

const QrScanPage = () => {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [qrCodeMessage, setQrCodeMessage] = useState("");
    const [scanData, setScanData] = useState({ marketId: "", storeId: "" });

    useEffect(() => {
        const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
                setQrCodeMessage(result.data);
                if (result.data.startsWith("syluv")) {
                    qrScanner.stop();
                    const params = new URLSearchParams(
                        result.data.split("?")[1]
                    );
                    const marketId = params.get("marketId");
                    const storeId = params.get("storeId");

                    setScanData({ marketId, storeId });
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

    const handleNavigate = useCallback(() => {
        syluvAxios
            .post(`/home/${scanData.storeId}/qrvisit`)
            .catch((error) => {
                // Do Nothing
            })
            .finally(() => {
                navigate(`/market/${scanData.marketId}/${scanData.storeId}`, {
                    replace: true,
                });
            });
    }, [scanData, syluvAxios, navigate]);

    const handleReScan = useCallback(() => {
        //새로고침
        window.location.reload();
    }, []);

    return (
        <>
            {scanData.marketId && scanData.storeId && (
                <ButtonModal
                    title={"가게 방문"}
                    subText={"가게 방문을 시작합니다."}
                    left={"취소"}
                    right={"확인"}
                    onLeftClick={handleReScan}
                    onRightClick={handleNavigate}
                />
            )}
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
        </>
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
    height: 100dvh;
    width: 480px;
    position: relative;
    @media (max-width: 480px) {
        width: 100dvw;
    }
    overflow: hidden;
    max-height: 100vh;
    max-width: 480px;
`;

const Camera = styled.video`
    width: 480px;
    height: 100dvh;
    object-fit: cover;
    position: absolute;
    @media (max-width: 480px) {
        width: 100vw;
    }
`;

const Hole = styled.div`
    z-index: 3;
    border-radius: 20px;
    border: 2px solid ${({ theme }) => theme.color.primary};
    width: 400px;
    height: 400px;
    @media (max-width: 480px) {
        height: calc(100vw - 40px);
        width: calc(100vw - 40px);
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Overlay = styled.div`
    z-index: 2;
    height: 400px;
    width: 400px;
    border-radius: 820px;
    border: 800px solid rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 480px) {
        height: calc(100vw - 40px);
        width: calc(100vw - 40px);
    }
    overflow: hidden;
`;

const Text = styled.div`
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 4;
    display: flex;
    gap: 4px;
    top: 80%;
    left: 50%;
    transform: translate(-50%, 50%);
    color: white;
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default QrScanPage;
