import styled from "styled-components";
import CartItem from "./CartItem";
import StoreHeader from "./StoreHeader";
import useCartStore from "hooks/useCartStore";

const Store = ({ name = "" }) => {
    const { carts } = useCartStore();
    const storeCart = carts[name] || [];
    return (
        <Container>
            <StoreHeader name={name} />
            <CartItemContainer>
                {storeCart.map((item, index) => (
                    <CartItem
                        key={index}
                        name={item.name}
                        price={item.price}
                        count={item.count}
                        storeName={name}
                        ImgSrc={item.ImgSrc}
                    />
                ))}
            </CartItemContainer>
        </Container>
    );
};

export default Store;

const Container = styled.div``;

const CartItemContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
