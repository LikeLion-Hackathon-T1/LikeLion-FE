import Header from "components/Common/Header";
import styled from "styled-components";

const OrderPage = () => {
    return (
        <>
            <Header title="주문하기" cart={false} />
            <Container>
                <div>
                    <span>수령방식</span>
                    <div>
                        <div>
                            <span>찾아가기</span>
                            <span>무료</span>
                        </div>
                        <div>
                            <span>배달받기</span>
                            <span>20,000원</span>
                        </div>
                    </div>
                </div>

                <div>
                    <span>수령 예상 시각</span>
                    <div>23시 31분</div>
                </div>

                <div>
                    <span>내 연락처</span>
                    <span>010-1234-5678</span>
                </div>

                <div>
                    <fieldset>
                        <legend>결제 수단</legend>
                        <div>
                            <input
                                type="radio"
                                id="payment-toss"
                                name="payment"
                                value="toss"
                            />
                            <label for="payment-toss">토스페이</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="payment-transfer"
                                name="payment"
                                value="card"
                            />
                            <label for="payment-transfer">신용카드</label>
                        </div>
                    </fieldset>
                </div>

                <div>
                    <span>결제 금액</span>
                    <div>
                        <span>주문금액</span>
                        <span>31,000원</span>
                    </div>
                    <div>
                        <span>배달팁</span>
                        <span>20,000원</span>
                    </div>
                </div>
            </Container>
            <OrderButton>
                {new Intl.NumberFormat("ko-KR").format(51000)}원 결제하기
            </OrderButton>
        </>
    );
};

const Container = styled.div`
    padding: 0 20px;
    width: 100%;
`;

const OrderButton = styled.button`
    position: fixed;
    bottom: 12px;
    width: 440px;
    height: 48px;
    margin: 0px 20px;
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    border: none;
    border-radius: 8px;
    cursor: pointer;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }
`;
export default OrderPage;
