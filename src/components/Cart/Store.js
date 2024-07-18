import styled from "styled-components";
import CartItem from "./CartItem";
import StoreHeader from "./StoreHeader";
import useCartStore from "../../hooks/useCartStore";

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
                {/* <AddMenu>+ 메뉴 추가</AddMenu> */}
            </CartItemContainer>
        </Container>
    );
};

export default Store;

const Container = styled.div``;

const CartItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 8px 10px;
    margin-top: 10px;
`;

const AddMenu = styled.div`
    border-top: 1px solid gray;
    padding-top: 10px;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
`;
