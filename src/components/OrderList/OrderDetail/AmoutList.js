import { GraySpace, ListContainer } from "pages/OrderDetailPage";
import styled from "styled-components";

const AmountList = () => {
    return (
        <ListContainer>
            <GraySpace />
            <AmountContainer>
                <AmountTop>
                    <AmountTitle>결제금액</AmountTitle>
                    <AmountDetail>
                        <AmountText>주문금액</AmountText>
                        <AmountText>47,000원</AmountText>
                    </AmountDetail>
                    <AmountDetail>
                        <AmountText>배달팁</AmountText>
                        <AmountText>14,000원</AmountText>
                    </AmountDetail>
                </AmountTop>
                <AmountBottom>
                    <AmountDetail>
                        <AmountTitle>총 결제금액</AmountTitle>
                        <AmountTitle>61,000원</AmountTitle>
                    </AmountDetail>
                    <AmountDetail>
                        <AmountTitle>결제 방법</AmountTitle>
                        <AmountTitle>토스페이</AmountTitle>
                    </AmountDetail>
                </AmountBottom>
            </AmountContainer>
        </ListContainer>
    );
};

export default AmountList;

const AmountContainer = styled.div`
    margin-top: 13px;
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
    padding: 10px 20px;
    gap: 14px;
    display: flex;
    flex-direction: column;
`;

const AmountTitle = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const AmountText = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const AmountDetail = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const AmountTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AmountBottom = styled(AmountTop)`
    gap: 12px;
`;
