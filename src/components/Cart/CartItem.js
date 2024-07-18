import styled from "styled-components";
import ItemCouter from "./ItemCounter";
import { useState } from "react";
import useCartStore from "../../hooks/useCartStore";
import Item from "../Common/Item/ItemInfo";

const CartItem = ({
    name,
    count = 0,
    storeName,
    price,
    desc,
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

    return (
        <Container>
            <Item name={name} price={price} desc={desc} ImgSrc={ImgSrc} />
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

export default CartItem;
