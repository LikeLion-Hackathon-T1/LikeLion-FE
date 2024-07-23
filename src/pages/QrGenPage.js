import QRCode from "qrcode.react";
import { useState } from "react";
import styled from "styled-components";

const QrGenPage = () => {
    const [marketId, setMarketId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    return (
        <Container>
            <QRCode
                value={`https://syluv.store/market/${marketId}/${storeId}`}
            />
            <InputContainer>
                <Input
                    type="text"
                    value={marketId}
                    placeholder="marketId"
                    onChange={(e) => setMarketId(e.target.value)}
                />
                <Input
                    type="text"
                    value={storeId}
                    placeholder="storeId"
                    onChange={(e) => setStoreId(e.target.value)}
                />
            </InputContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 100px;
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    height: 20px;
`;

export default QrGenPage;
