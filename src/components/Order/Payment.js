import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import useSyluvAxios from "hooks/useSyluvAxios";

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

const Payments = ({ isReady, data, onClick = () => {}, phone, hour, min }) => {
    const axiosInstance = useSyluvAxios();
    const [tossPayments, setTossPayments] = useState(null);
    const [orderData, setOrderData] = useState({
        orderNum: "",
        userData: {},
        items: data,
        phone: "",
        hour,
        min,
        amount: 0,
    });

    console.log(data);

    useEffect(() => {
        const formattedPhone = phone.split("-").join("");
        const totalAmount = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        setOrderData((prev) => ({
            ...prev,
            phone: formattedPhone,
            amount: totalAmount,
        }));
    }, [data, phone, hour, min]);

    useEffect(() => {
        async function initializePayment() {
            try {
                const instance = await loadTossPayments(clientKey);
                setTossPayments(instance);
            } catch (error) {
                console.error("Error initializing Toss Payments:", error);
            }
        }
        initializePayment();
    }, []);

    const handlePayment = async () => {
        if (!tossPayments) {
            alert("Payment service is initializing. Please try again later.");
            return;
        }

        try {
            const [{ data: orderNumberData }, { data: userData }] =
                await Promise.all([
                    axiosInstance.get("/order/generatenum"),
                    axiosInstance.get("/users/mypage"),
                ]);

            const newOrderData = {
                ...orderData,
                orderNum: orderNumberData.payload,
                userData: userData.payload,
            };

            await tossPayments.requestPayment("CARD", {
                amount: newOrderData.amount,
                orderId: newOrderData.orderNum,
                orderName: `${data[0].menuName} 외 ${data.length - 1}개`,
                successUrl: `${window.location.origin}/order/success`,
                failUrl: `${window.location.origin}/order/fail`,
                customerEmail: newOrderData.userData.email,
                customerName: newOrderData.userData.name,
                customerMobilePhone: newOrderData.phone,
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error(
                "An error occurred during the payment request:",
                error
            );
        }
    };

    const handleClick = () => {
        const isTimeValid = onClick();
        if (isReady && isTimeValid) {
            handlePayment();
        }
    };

    return (
        <OrderButton error={!isReady} onClick={handleClick}>
            {new Intl.NumberFormat("ko-KR").format(orderData.amount)}원 결제하기
        </OrderButton>
    );
};

export default Payments;

const OrderButton = styled.button`
    width: 440px;
    height: 48px;
    margin: 20px;
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    border: none;
    border-radius: 8px;
    cursor: pointer;

    ${({ error }) =>
        error &&
        `
        background-color: #b3b3b3;
        cursor: not-allowed;
    `}

    @media (max-width: 480px) {
        width: calc(100vw - 40px);
    }
`;
