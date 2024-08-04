import styled from "styled-components";

const OrderItem = ({ order }) => {
    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <Container>
            <div className="content">
                <img src={order.menuImg} alt="주문상품" />
                <div className="item-info">
                    <div>
                        <span>{order.menuName}</span>
                        <span className="count">{order.quantity}개</span>
                    </div>
                    <span className="price">
                        가격: {formatAmount(order.totalPrice)}원
                    </span>
                </div>
            </div>
        </Container>
    );
};

export default OrderItem;

const Container = styled.div`
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray900};
    padding: 24px 20px 24px 20px;
    font-size: 14px;

    img {
        width: 78px;
        height: 78px;
        border-radius: 12px;
    }

    .content {
        display: flex;
        gap: 12px;

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;
        }
    }
    .count {
        color: ${({ theme }) => theme.color.gray500};
    }
    .price {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
    .item-info {
        padding: 2px 0px;
    }
`;
