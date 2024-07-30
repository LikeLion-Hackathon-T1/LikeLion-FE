import { useQuery } from "@tanstack/react-query";
import Splash from "components/Common/Splash";
import useSyluvAxios from "hooks/useSyluvAxios";
import React, { useEffect, useState } from "react";

const MenuTestPage = () => {
    const syluvAxios = useSyluvAxios();
    const [storeList, setStoreList] = useState(null);
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-storeList"],
        queryFn: () => syluvAxios.get("/store/info"),
    });

    useEffect(() => {
        if (data) {
            setStoreList(data.data.payload);
        }
    }, [data]);

    if (isLoading) return <Splash />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            {storeList?.map((item) => (
                <div key={item.storeId}>
                    <div>{item.name}</div>
                    <div>{item.storeId}</div>
                    {item.menuDetails.map((menu) => (
                        <div key={menu.menuId}>
                            <div>{menu.name}</div>
                            <div>{menu.price}</div>
                            <div>{menu.menuId}</div>
                            <button
                                onClick={() =>
                                    syluvAxios
                                        .post("/cart", {
                                            menuId: menu.menuId,
                                            quantity: 1,
                                        })
                                        .then((res) => {})
                                }
                            >
                                장바구니에 추가
                            </button>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={() => syluvAxios.get("/cart").then((res) => {})}>
                장바구니 확인하기
            </button>
        </div>
    );
};

export default MenuTestPage;
