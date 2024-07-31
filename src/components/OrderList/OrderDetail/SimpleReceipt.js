import { ListContainer } from "pages/OrderDetailPage";
import styled from "styled-components";

const SimpleReceipt = () => {
    return (
        <Container>
            <div className="container order">
                <span>2024년 7월 17일 오후 08:12 주문</span>
                <span>주문번호 B1UD01004L</span>
            </div>
            <div className="container">
                <span className="title-text">세미수산</span>
                <span className="sub-text">픽업이 완료되었어요</span>
            </div>
        </Container>
    );
};

export default SimpleReceipt;

const Container = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: calc(100% - 40px);

    .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .order {
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        color: ${({ theme }) => theme.color.gray600};
    }

    .title-text {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
    }

    .sub-text {
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.primary};
    }
`;
