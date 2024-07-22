import Header from "components/Common/Header";
import StoreList from "components/Cart/StoreList";
import useCartStore from "hooks/useCartStore";

const CartPage = () => {
    const { deleteClickedStores, deleteClickedItems, isAnyItemClicked } =
        useCartStore();
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
