import styled from "styled-components";
import ItemCouter from "./ItemCounter";
import { useState } from "react";
import useCartStore from "../../hooks/useCartStore";

const CartItem = ({
    name,
    price,
    count = 0,
    storeName,
    ImgSrc = "https://via.placeholder.com/100",
}) => {
    const [quantity, setQuantity] = useState(count);
    const { updateItemCount } = useCartStore();

    const handleIncrease = () => {
        const newCount = quantity + 1;
        setQuantity(newCount);
        updateItemCount(storeName, name, newCount);
    };

    const handleDecrease = () => {
        const newCount = quantity > 0 ? quantity - 1 : 0;
        setQuantity(newCount);
        updateItemCount(storeName, name, newCount);
    };

    const handleRemove = () => {
        setQuantity(0);
        updateItemCount(storeName, name, 0);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price) + "원";
    };

    return (
        <Container>
            <MenuImage src={ImgSrc} alt="메뉴 이미지" />
            <ItemInfo>
                <ItemTitle>{name}</ItemTitle>
                <ItemPrice>{formatPrice(price)}</ItemPrice>
            </ItemInfo>
            <EraseButton onClick={handleRemove}>삭제</EraseButton>
            <ItemCouter
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
            />
        </Container>
    );
};

const EraseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    gap: 20px;
    position: relative;
`;

const MenuImage = styled.img`
    width: 64px;
    height: 64px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemTitle = styled.div`
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
`;

const ItemPrice = styled.div`
    font-size: 14px;
`;

export default CartItem;
