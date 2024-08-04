import Button from "components/Common/Button";
import Header from "components/Common/Header";
import OrderItem from "owner/components/OrderItem";
import styled from "styled-components";

const OwnerDetailPage = ({
    item,
    handleItem = () => {},
    handleCancel = () => {},
    handleSuccess = () => {},
}) => {
    const handleDate = (date) => {
        // "2024-08-01T01:54:46" -> "2024.08.01 오후 1:54"
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const ampm = hour >= 12 ? "오후" : "오전";
        const hour12 = hour % 12;
        return `${year}.${month}.${day} ${ampm} ${hour12}:${minute}`;
    };
    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <Header
                title="주문상세"
                cart={false}
                onLeftClick={() => handleItem(null)}
            />
            <Wrapper>
                <div className="info">
                    <span>
                        주문일시: {handleDate(item.createdAt)} {item.orderTime}
                    </span>
                    <span>주문번호: {item.orderNum}</span>
                    <span>주문자명: {item.userName}</span>
                </div>
                {item.menu.map((order) => (
                    <OrderItem key={order.createdAt} order={order} />
                ))}
                <BillContainer>
                    <div>
                        <span>결제금액</span>
                        <span className="right">
                            {formatAmount(item.totalPrice)}원
                        </span>
                    </div>
                    <div>
                        <span>결제방법</span>
                        <span className="right">토스페이</span>
                    </div>
                </BillContainer>
                <ButtonContainer>
                    <Button
                        text="접수 취소"
                        onClick={() => {
                            handleCancel(item.id);
                            handleItem(null);
                        }}
                    />
                    <Button
                        text="접수하기"
                        type="2"
                        onClick={() => {
                            handleSuccess(item.id);
                            handleItem(null);
                        }}
                    />
                </ButtonContainer>
            </Wrapper>
        </>
    );
};

export default OwnerDetailPage;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 20px;
    padding: 0 20px;
    display: flex;
    gap: 12px;

    width: 440px;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }
`;

const BillContainer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.color.gray900};
    margin: 0px 20px;
    padding: 24px 0px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    div {
        display: flex;
        justify-content: space-between;
    }

    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray800};

    .right {
        color: ${({ theme }) => theme.color.gray900};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: 18px;
    }
`;

const Wrapper = styled.div`
    margin-top: 70px;
    margin-bottom: 80px;
    .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 16px 20px 24px 20px;

        span {
            font-size: 14px;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            color: ${({ theme }) => theme.color.gray600};
        }
    }
`;
