import { ListContainer } from "pages/OrderDetailPage";
import styled from "styled-components";

const SimpleReceipt = ({ date, orderNum, name, state }) => {
    return (
        <Container>
            <div className="container order">
                <div className="container">
                    <span className="sub-text">{state}</span>
                    <span className="title-text">{name}</span>
                </div>
                <span>{date} 주문</span>
                <span>주문번호 {orderNum}</span>
            </div>
        </Container>
    );
};

export default SimpleReceipt;

const Container = styled.div`
    margin-top: 16px;
    width: calc(100% - 40px);

    .container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
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
