import styled from "styled-components";
import ItemCounter from "./ItemCounter";
import { useEffect, useState } from "react";
import useCartStore from "hooks/useCartStore";
import Item from "../Common/Item/Item";
import { ReactComponent as Cancel } from "assets/images/cancle.svg";
import CheckButton from "./CheckButton";

const CartItem = ({
    name,
    count = 0,
    storeName,
    price,
    desc,
    ImgSrc = "https://via.placeholder.com/100",
}) => {
    const [quantity, setQuantity] = useState(count);
    const {
        updateItemCount,
        removeItem,
        clickItem,
        removeClickedItem,
        clickedItem,
    } = useCartStore();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(clickedItem[storeName] && clickedItem[storeName][name]);
    }, [clickedItem, storeName, name]);

    useEffect(() => {
        setQuantity(count);
    }, [count]);

    const handleIncrease = () => {
        const newCount = quantity + 1;
        setQuantity(newCount);
        updateItemCount(storeName, name, newCount);
    };

    const handleDecrease = () => {
        const newCount = quantity > 0 ? quantity - 1 : quantity;
        setQuantity(newCount);
        updateItemCount(storeName, name, newCount);
    };

    const handleRemove = () => {
        removeItem(storeName, name);
        setQuantity(0);
    };

    const handleClick = () => {
        if (isChecked) {
            removeClickedItem(storeName, name);
        } else {
            clickItem(storeName, name);
        }
        setIsChecked(!isChecked);
    };

    return (
        <CartItemContainer>
            <Container>
                <CheckButton isChecked={isChecked} onClick={handleClick} />
                <Item name={name} price={price} desc={desc} ImgSrc={ImgSrc} />
                <EraseButton onClick={handleRemove} />
                <ItemCounter
                    quantity={quantity}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                />
            </Container>
        </CartItemContainer>
    );
};

const CartItemContainer = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
`;

const EraseButton = styled(Cancel)`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
`;

const Container = styled.div`
    margin: 24px 20px;
    gap: 8px;
    display: flex;
    position: relative;
`;

export default CartItem;
