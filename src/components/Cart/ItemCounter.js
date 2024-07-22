import styled from "styled-components";
import { ReactComponent as PlusIcon } from "assets/images/increase.svg";
import { ReactComponent as MinusIcon } from "assets/images/decrease.svg";
import { useCallback } from "react";

const ItemCouter = ({ quantity = 0, onIncrease, onDecrease }) => {
    const handleDecrease = useCallback(() => {
        if (quantity === 1) return;
        onDecrease();
    }, [quantity, onDecrease]);

    return (
        <ItemCount>
            <LeftButton onClick={handleDecrease} quantity={quantity}>
                <MinusIcon />
            </LeftButton>
            <Count>{quantity}</Count>
            <RightButton onClick={onIncrease}>
                <PlusIcon />
            </RightButton>
        </ItemCount>
    );
};

export default ItemCouter;

const ItemCount = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 157px;
    bottom: 0;
    align-items: center;
    border: ${({ theme }) => `1px solid ${theme.color.gray200}`};
    border-radius: 4px;
    width: 92px;
    height: 32px;
`;

const CountButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 16px;
    height: 16px;
`;

const LeftButton = styled(CountButton)`
    margin-left: 8px;
    fill-opacity: ${({ quantity }) => (quantity === 1 ? 0.5 : 1)};
    cursor: ${({ quantity }) => (quantity === 1 ? "default" : "pointer")};
`;

const RightButton = styled(CountButton)`
    margin-right: 8px;
`;

const Count = styled.span`
    color: ${({ theme }) => theme.color.gray800};
    font-size: 16px;
    font-weight: 400;
`;
