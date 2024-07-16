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
            <ItemCouter
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
            />
        </Container>
    );
};

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
