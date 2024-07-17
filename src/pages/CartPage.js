import Header from "../components/Common/Header";
import StoreList from "../components/Cart/StoreList";
import { ScrollContainer } from "../styles/SyluvStyle";

const CartPage = () => {
    return (
        <>
            <Header title="장바구니" cart={false} />
            <ScrollContainer>
                <StoreList />
            </ScrollContainer>
        </>
    );
};

export default CartPage;
