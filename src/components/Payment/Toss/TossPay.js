import { loadTossPayments } from "@tosspayments/payment-sdk";
import { useEffect, useState } from "react";

// ------  SDK 초기화 ------
const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
const customerKey = "aBtcWugrqyefkHtP6SCya";

export default function TossPay() {
    const [tossPayments, setTossPayments] = useState(null);
    const [amount] = useState({
        currency: "KRW",
        value: 50000,
    });

    useEffect(() => {
        async function fetchTossPayments() {
            try {
                const tossPaymentsInstance = await loadTossPayments(clientKey);
                setTossPayments(tossPaymentsInstance);
            } catch (error) {
                console.error("Error fetching tossPayments:", error);
            }
        }

        fetchTossPayments();
    }, []);

    async function requestPayment() {
        if (!tossPayments) {
            alert(
                "결제 인스턴스를 초기화 중입니다. 잠시 후 다시 시도해주세요."
            );
            return;
        }

        try {
            await tossPayments.requestPayment("CARD", {
                amount: amount.value,
                orderId: "1eMySX7fCc5-p9ITEZz5d", // 고유 주문번호
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/success", // 결제 요청이 성공하면 리다이렉트되는 URL
                failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
                // 카드 결제에 필요한 정보
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT", // 통합결제창 여는 옵션
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error("결제 요청 중 오류가 발생했습니다:", error);
        }
    }

    return (
        <div>
            <button className="button" onClick={() => requestPayment()}>
                결제하기
            </button>
        </div>
    );
}
