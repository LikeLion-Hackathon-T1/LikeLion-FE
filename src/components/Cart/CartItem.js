import styled from "styled-components";
import ItemCounter from "./ItemCounter";
import { useCallback, useState, useEffect } from "react";
import Item from "../Common/Item/Item";
import { ReactComponent as Cancel } from "assets/images/cancle.svg";
import CheckButton from "./CheckButton";

const CartItem = ({
    name,
    count = 0,
    price,
    cartId,
    ImgSrc = "https://via.placeholder.com/100",
    handleCartList = () => {},
    isChecked = false,
    onCheckChange = () => {},
}) => {
    const [quantity, setQuantity] = useState(count);
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleRemove = useCallback(() => {
        handleCartList(cartId, { quantity: 0 });
    }, [handleCartList, cartId]);

    const handleChangeQuantity = useCallback(
        (quantity) => {
            handleCartList(cartId, { quantity });
            setQuantity(quantity);
        },
        [handleCartList, cartId]
    );

    const handleIncrease = useCallback(() => {
        handleChangeQuantity(quantity + 1);
    }, [handleChangeQuantity, quantity]);

    const handleDecrease = useCallback(() => {
        handleChangeQuantity(quantity - 1);
    }, [handleChangeQuantity, quantity]);

    const handleClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onCheckChange(cartId, newChecked);
    };

    return (
        <CartItemContainer>
            <Container>
                <CheckButton isChecked={checked} onClick={handleClick} />
                <Item name={name} price={price} ImgSrc={ImgSrc} />
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
