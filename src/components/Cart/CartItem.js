import styled from "styled-components";
import ItemCounter from "./ItemCounter";
import { useCallback, useState } from "react";
import Item from "../Common/Item/Item";
import { ReactComponent as Cancel } from "assets/images/cancle.svg";
import CheckButton from "./CheckButton";
import useSyluvAxios from "hooks/useSyluvAxios";

const CartItem = ({
    name,
    count = 0,
    price,
    cartId,
    ImgSrc = "https://via.placeholder.com/100",
}) => {
    const [quantity, setQuantity] = useState(count);
    const [isChecked, setIsChecked] = useState(false);
    const syluvAxios = useSyluvAxios();

    const handleRemove = useCallback(() => {
        syluvAxios
            .delete(`/cart/${cartId}/delete`)
            .then(() => {
                alert("삭제되었습니다.");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [syluvAxios, cartId]);

    const handleChangeQuantity = useCallback(
        (quantity) => {
            syluvAxios
                .patch(`/cart/${cartId}/update`, {
                    quantity,
                })
                .then(() => {
                    setQuantity(quantity);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [syluvAxios, cartId]
    );

    const handleIncrease = useCallback(() => {
        handleChangeQuantity(quantity + 1);
    }, [handleChangeQuantity, quantity]);

    const handleDecrease = useCallback(() => {
        handleChangeQuantity(quantity - 1);
    }, [handleChangeQuantity, quantity]);

    const handleClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <CartItemContainer>
            <Container>
                <CheckButton
                    isChecked={isChecked}
                    onClick={() => {
                        handleClick();
                    }}
                />
                <Item name={name} price={price} ImgSrc={ImgSrc} />
                <EraseButton
                    onClick={() => {
                        handleRemove();
                    }}
                />
                <ItemCounter
                    quantity={quantity}
                    onDecrease={() => {
                        handleDecrease();
                    }}
                    onIncrease={() => {
                        handleIncrease();
                    }}
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
