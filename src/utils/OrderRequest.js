import useOrderStore from "hooks/useOrderStore";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const OrderRequest = () => {
    const { getGlobalOrderData } = useOrderStore();
    const syluvAxios = useSyluvAxios();
    const [data, setData] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setData(getGlobalOrderData());
    }, [getGlobalOrderData]);

    useEffect(() => {
        if (data) {
            syluvAxios
                .post("/order/toss", {
                    menuIds: data.items.map((item) => item.cartid),
                    orderNum: data.orderNum,
                    paymentKey: data.paymentKey,
                    amount: data.amount,
                    pickUpRoute: data.pickUpRoute,
                    visitHour: data.hour,
                    visitMin: data.min,
                    phoneNum: data.phone,
                })
                .then((res) => {
                    console.log(res);
                    setResult(res.data.payload);
                });
        }
    }, [data]);
    return (
        <div>
            <h1>Order</h1>
        </div>
    );
};
export default OrderRequest;
