import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";

const QrScanPage = () => {
    const videoRef = useRef(null);
    const [qrCodeMessage, setQrCodeMessage] = useState("");

    useEffect(() => {
        const qrScanner = new QrScanner(
            videoRef.current,
            (result) => {
                setQrCodeMessage(result.data);
                if (result.data.startsWith("https://syluv.store/market/")) {
                    window.location.href = result.data; // QR 코드 인식 후 해당 URL로 이동합니다.
                }
            },
            {
                onDecodeError: (error) => {
                    console.error(error);
                },
                highlightScanRegion: true,
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
            <CameraContainer>
                <Camera ref={videoRef} style={{ width: "100%" }} />
            </CameraContainer>
            <Text>가게에 부착되어 있는 QR을 정확히 인식해주세요</Text>
        </Container>
    );
};

const Container = styled.div`
    margin: 0 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    gap: 90px;
`;

const CameraContainer = styled.div`
    width: 100%;
    max-width: 400px; /* 최대 크기를 설정할 수 있습니다. 필요에 따라 조정하세요 */
`;

const Camera = styled.video`
    width: 100%;
    aspect-ratio: 1; /* 정사각형 비율을 설정 */
    object-fit: cover; /* 비율을 유지하면서 요소를 덮도록 설정 */
`;

const Text = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default QrScanPage;
