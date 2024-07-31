import Header from "components/Common/Header";
import { ReactComponent as OrderIcon } from "assets/images/order-success.svg";
import Button from "components/Common/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header title="주문 완료" cart={false} back={false} />
            <Wrapper>
                <div className="header">
                    <OrderIcon />
                    <span>
                        주문해주셔서 감사합니다 <br />
                        최고의 서비스로 모시겠습니다
                    </span>
                </div>
                <div className="body">
                    <div>
                        <span className="left-text">상호명</span>
                        <span className="right-text">원조 누드치즈김밥</span>
                    </div>
                    <div>
                        <span className="left-text">결제수단</span>
                        <span className="right-text">토스페이</span>
                    </div>
                    <div>
                        <span className="left-text">결제일시</span>
                        <span className="right-text">2024.07.31 19:19:02</span>
                    </div>
                    <div>
                        <span className="left-text">결제금액</span>
                        <span className="price-text">5000,000원</span>
                    </div>
                </div>
                <div className="cancle">
                    결제 취소를 원할 경우 매장에 문의해주세요
                </div>
                <div className="button-wrapper">
                    <Button
                        type="2"
                        text="홈으로"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>
            </Wrapper>
        </>
    );
};

export default OrderSuccess;

const Wrapper = styled.div`
    padding: 0px 20px;

    .header {
        margin-top: 40px;
        margin-bottom: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;

        span {
            font-size: 20px;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            color: ${({ theme }) => theme.color.gray900};
            text-align: center;
            line-height: 30px;
        }
    }

    .body {
        display: flex;
        flex-direction: column;
        gap: 20px;

        border-top: 1px solid ${({ theme }) => theme.color.gray900};
        border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
        padding: 26px 0px;

        div {
            display: flex;
            justify-content: space-between;

            .left-text {
                font-size: 14px;
                font-weight: ${({ theme }) => theme.fontWeight.regular};
                color: ${({ theme }) => theme.color.gray800};
            }

            .right-text {
                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                color: ${({ theme }) => theme.color.gray900};
            }

            .price-text {
                font-size: 20px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .cancle {
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        color: ${({ theme }) => theme.color.gray300};
        padding: 16px 0;
    }

    .button-wrapper {
        position: absolute;
        width: 440px;

        @media (max-width: 480px) {
            width: calc(100% - 40px);
        }

        bottom: 20px;
    }
`;
