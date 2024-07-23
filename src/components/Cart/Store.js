import styled from "styled-components";
import CartItem from "./CartItem";
import StoreHeader from "./StoreHeader";

const Store = ({ name = "", items = [] }) => {
    return (
        <Container>
            <StoreHeader name={name} />
            <CartItemContainer>
                {items.map((item, index) => (
                    <CartItem
                        key={index}
                        name={item.menuName}
                        price={item.price}
                        count={item.quantity}
                        storeName={name}
                        cartId={item.cartId}
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
