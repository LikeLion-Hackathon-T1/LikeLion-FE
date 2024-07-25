import Header from "components/Common/Header";
import StoreList from "components/Cart/StoreList";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState, useCallback } from "react";

const CartPage = () => {
    const syluvAxios = useSyluvAxios();
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rightDisabled, setRightDisabled] = useState(true);

    useEffect(() => {
        const getCartList = async () => {
            try {
                const res = await syluvAxios.get("/cart");
                const updatedCartList = res.data.payload.map((item) => ({
                    ...item,
                    isChecked: false, // Initialize with false
                }));
                setCartList(updatedCartList);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getCartList();
    }, []);

    useEffect(() => {
        const isAnyItemChecked = cartList.some((item) => item.isChecked);
        setRightDisabled(!isAnyItemChecked);
    }, [cartList]);

    const handleRight = useCallback(async () => {
        const checkedItems = cartList.filter((item) => item.isChecked);
        checkedItems.forEach((item) => {
            syluvAxios
                .delete(`/cart/${item.cartid}/delete`)
                .then(() => {
                    setCartList((prevCartList) =>
                        prevCartList.filter(
                            (cartItem) => cartItem.cartid !== item.cartid
                        )
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }, [cartList, syluvAxios]);

    return (
        <>
            <Header
                title="장바구니"
                cart={false}
                rightText="삭제"
                handleRight={handleRight}
                rightDisabled={rightDisabled}
            />
            <StoreList
                cartList={cartList}
                setCartList={setCartList}
                isLoading={isLoading}
            />
        </>
    );
};

export default CartPage;
