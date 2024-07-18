import Header from "components/Common/Header";
import StoreList from "components/Cart/StoreList";

const CartPage = () => {
    return (
        <>
            <Header title="장바구니" cart={false} />
            <StoreList />
        </>
    );
};

export default CartPage;
