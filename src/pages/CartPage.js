import Header from "components/Common/Header";
import StoreList from "components/Cart/StoreList";
import useCartStore from "hooks/useCartStore";
import { useEffect, useState } from "react";
import useSyluvAxios from "hooks/useSyluvAxios";

const CartPage = () => {
    const syluvAxios = useSyluvAxios();
    const [storeList, setStoreList] = useState(null);
    const { deleteClickedStores, deleteClickedItems, isAnyItemClicked } =
        useCartStore();

    useEffect(() => {
        const getCart = async () => {
            await syluvAxios
                .get("/cart")
                .then((res) => {
                    setStoreList(res.data.payload);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getCart();
    }, []);
    return (
        <>
            <Header
                title="장바구니"
                cart={false}
                rightText="삭제"
                handleRight={() => {
                    deleteClickedStores();
                    deleteClickedItems();
                }}
                rightDisabled={!isAnyItemClicked()}
            />
            <StoreList />
        </>
    );
};

export default CartPage;
