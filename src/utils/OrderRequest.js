import Splash from "components/Common/Splash";
import useOrderStore from "hooks/useOrderStore";
import useSyluvAxios from "hooks/useSyluvAxios";
import OrderResult from "pages/OrderResult";
import { useEffect, useState } from "react";

const OrderRequest = () => {
    const { getGlobalOrderData } = useOrderStore();
    const syluvAxios = useSyluvAxios();
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                });
        }
    }, [data]);

    if (isLoading) {
        return <Splash />;
    }

    return <OrderResult />;
};
export default OrderRequest;
