import { useState } from "react";
import styled from "styled-components";
import OrderManageItem from "./OrderManageItem";

const OrderManageTab = () => {
    const [selected, setSelected] = useState("신규/진행중");
    return (
        <Container>
            <div className="button-bar">
                <button
                    className={selected === "신규/진행중" ? "selected" : ""}
                    onClick={() => setSelected("신규/진행중")}
                >
                    신규/진행중
                </button>
                <button
                    className={selected === "준비 완료" ? "selected" : ""}
                    onClick={() => setSelected("준비 완료")}
                >
                    완료한 주문
                </button>
            </div>
            <OrderManageItem />
            <OrderManageItem />
        </Container>
    );
};

export default OrderManageTab;

const Container = styled.div`
    .body {
        display: flex;
        flex-direction: column;
        gap: 8px;

        color: ${({ theme }) => theme.color.gray600};
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    margin-top: 130px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 35px;

    .button-bar {
        margin: 0px 20px;
        display: flex;
        gap: 7px;

        button {
            color: ${({ theme }) => theme.color.gray400};
            font-weight: ${({ theme }) => theme.fontWeight.regular};
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 54px;
            border: 1px solid ${({ theme }) => theme.color.gray400};
            background-color: white;
            cursor: pointer;
        }
        .selected {
            color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
        }
    }
`;
