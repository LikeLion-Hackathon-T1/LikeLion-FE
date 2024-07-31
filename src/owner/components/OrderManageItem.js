import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderManageItem = () => {
    const navigate = useNavigate();
    return (
        <OrderContainer
            onClick={() => {
                navigate("/owner/1/1");
            }}
        >
            <div className="header">
                <div className="left">
                    <span className="time">픽업(16:00)</span>
                    <div className="status">
                        <span>08:12</span>
                        <div>준비 중</div>
                    </div>
                </div>
                <button className="right">준비 완료</button>
            </div>
            <div className="body">
                <span>매콤 제육볶음x2, 키토김밥, 스시, 오니기리...</span>
                <span>주문번호: B1UD01004L</span>
                <span>토스페이 37,600원(예금주:OOO)</span>
            </div>
        </OrderContainer>
    );
};

export default OrderManageItem;

const OrderContainer = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .time {
                color: ${({ theme }) => theme.color.primary};
                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            }

            .status {
                align-items: center;
                display: flex;
                gap: 8px;
                span {
                    color: ${({ theme }) => theme.color.gray900};
                    font-size: 20px;
                    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                }
                div {
                    font-weight: ${({ theme }) => theme.fontWeight.medium};
                    border: 1px solid ${({ theme }) => theme.color.primary};
                    color: ${({ theme }) => theme.color.primary};
                    border-radius: 54px;
                    padding: 5px 8px;
                    font-size: 12px;
                }
            }
        }
        .right {
            width: 80px;
            height: 40px;
            border-radius: 8px;
            border: none;
            background-color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
            color: white;

            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            cursor: pointer;
        }
        .before {
            color: ${({ theme }) => theme.color.primary};
            background-color: white;
            border: 1px solid ${({ theme }) => theme.color.primary};
        }
        margin-bottom: 20px;
    }
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    padding: 0px 20px;
    padding-bottom: 30px;
`;
