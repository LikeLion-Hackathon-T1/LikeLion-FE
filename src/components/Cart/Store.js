import styled from "styled-components";
import CartItem from "./CartItem";
import StoreHeader from "./StoreHeader";

const Store = ({
    name = "",
    items = [],
    changeCartList = () => {},
    toggleStoreCheck = () => {},
}) => {
    const allChecked = items.every((item) => item.isChecked);

    const handleStoreCheck = (isChecked) => {
        toggleStoreCheck(name, isChecked);
    };

    const handleItemCheckChange = (cartId, isChecked) => {
        changeCartList(cartId, { isChecked });
        if (!isChecked) {
            toggleStoreCheck(name, false);
        }
    };

    return (
        <Container>
            <StoreHeader
                name={name}
                isChecked={allChecked}
                onCheck={handleStoreCheck}
                storeSrc=""
            />
            <CartItemContainer>
                {items.map((item, index) => (
                    <CartItem
                        key={index}
                        name={item.menuName}
                        price={item.price}
                        count={item.quantity}
                        isChecked={item.isChecked}
                        storeName={name}
                        cartId={item.cartid}
                        handleCartList={changeCartList}
                        onCheckChange={handleItemCheckChange}
                        ImgSrc={
                            item.menuImg || "https://via.placeholder.com/100"
                        }
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
