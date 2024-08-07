import Header from "components/Common/Header";
import StoreList from "components/Cart/StoreList";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState, useCallback } from "react";
import Toast from "components/Common/Toast";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const syluvAxios = useSyluvAxios();
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rightDisabled, setRightDisabled] = useState(true);
    const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();

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
                navigate("/error", { replace: true });
            }
        };
        getCartList();
    }, [navigate]);

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
                    setToastMessage("장바구니에서 메뉴가 삭제되었습니다.");
                })
                .catch((err) => {
                    navigate("/error", { replace: true });
                });
        });
    }, [cartList, syluvAxios, navigate]);

    const closeToast = useCallback(() => {
        setToastMessage("");
    }, []);
    return (
        <>
            <Header
                title="장바구니"
                cart={false}
                rightText="삭제"
                handleRight={handleRight}
                rightDisabled={rightDisabled}
                backSrc={-1}
            />
            <StoreList
                cartList={cartList}
                setCartList={setCartList}
                isLoading={isLoading}
            />
            {toastMessage && (
                <Toast message={toastMessage} onClose={closeToast} />
            )}
        </>
    );
};

export default CartPage;
