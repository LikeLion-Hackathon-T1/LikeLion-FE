import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderItem = () => {
    const navigate = useNavigate();
    return (
        <Container
            onClick={() => {
                navigate("/order/1");
            }}
        >
            <div className="order">
                <div className="order-header">
                    <span className="title-text">광장시장</span>
                    <span className="main-text">2022.05.24 오후 8:30</span>
                </div>
                <div className="order-body">
                    <div className="left-section">
                        <span className="title-text">진아한복</span>
                        <span className="main-text">61,000원</span>
                    </div>
                    <span className="success">결제 확인 대기</span>
                </div>
            </div>
        </Container>
    );
};

export default OrderItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    background-color: white;
    cursor: pointer;

    .order-header {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        .title-text {
            font-size: 16px;
            color: ${({ theme }) => theme.color.gray900};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
        }
        .main-text {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray600};
            font-weight: ${({ theme }) => theme.fontWeight.medium};
        }
        padding-bottom: 20px;
        border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    }

    .order-body {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        color: ${({ theme }) => theme.color.gray500};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: 16px;
        align-items: center;
        margin-top: 16px;
        padding-bottom: 20px;

        .left-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .title-text {
            color: ${({ theme }) => theme.color.gray900};
        }
        .main-text {
            font-size: 14px;
        }
        .success {
            color: ${({ theme }) => theme.color.primary};
        }
    }
`;
