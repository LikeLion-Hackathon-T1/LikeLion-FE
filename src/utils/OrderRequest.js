import ButtonModal from "components/Common/ButtonModal";
import Splash from "components/Common/Splash";
import useOrderStore from "hooks/useOrderStore";
import useSyluvAxios from "hooks/useSyluvAxios";
import OrderResult from "pages/OrderResult";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderRequest = () => {
    const { getGlobalOrderData } = useOrderStore();
    const syluvAxios = useSyluvAxios();
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setData(getGlobalOrderData());
    }, [getGlobalOrderData]);

    useEffect(() => {
        if (data) {
            syluvAxios
                .post("/order/toss", {
                    cartIds: data.items.map((item) => item.cartid),
                    orderNum: data.orderNum,
                    paymentKey: data.paymentKey,
                    amount: data.amount,
                    pickUpRoute: data.pickUpRoute,
                    visitHour: data.hour,
                    visitMin: data.min,
                    phoneNum: data.phone,
                })
                .then((res) => {
                    setResult(res.data.payload);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsError(true);
                    setIsLoading(false);
                });
        }
    }, [data]);

    if (isLoading) {
        return <Splash />;
    }

    if (isError) {
        return (
            <ButtonModal
                title="주문 요청에 실패했습니다."
                subText="다시 시도해주세요."
                left="홈으로 이동"
                onLeftClick={() => navigate("/")}
                right="장바구니로 이동"
                onRightClick={() => navigate("/cart")}
            />
        );
    }

    return <OrderResult />;
};
export default OrderRequest;
