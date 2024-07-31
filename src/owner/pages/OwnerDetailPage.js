import Button from "components/Common/Button";
import Header from "components/Common/Header";
import OrderItem from "owner/components/OrderItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OwnerDetailPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header title="주문상세" cart={false} />
            <Wrapper>
                <div className="info">
                    <span>주문일시: 2024년 7월 17일 오후 08:12</span>
                    <span>주문번호: B1UD01004L</span>
                    <span>고객번호: 010-8634-0405</span>
                </div>
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <BillContainer>
                    <div>
                        <span>결제금액</span>
                        <span className="right">63,000원</span>
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
                            navigate(-1, { replace: true });
                        }}
                    />
                    <Button
                        text="접수하기"
                        type="2"
                        onClick={() => {
                            navigate(-1, { replace: true });
                        }}
                    />
                </ButtonContainer>
            </Wrapper>
        </>
    );
};

export default OwnerDetailPage;

const ButtonContainer = styled.div`
    position: absolute;
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
