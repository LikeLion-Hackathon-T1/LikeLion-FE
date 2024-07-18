import styled from "styled-components";

const ItemCouter = ({ quantity = 0, onIncrease, onDecrease }) => {
    return (
        <ItemCount>
            <MinusButton onClick={onDecrease}>-</MinusButton>
            <Count>{quantity}</Count>
            <PlusButton onClick={onIncrease}>+</PlusButton>
        </ItemCount>
    );
};

export default ItemCouter;

const ItemCount = styled.div`
    display: flex;
    gap: 5px;
    position: absolute;
    right: 0;
    bottom: 0;
    align-items: center;
    border: 1px solid #000;
    border-radius: 5px;
`;

const PlusButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
`;

const MinusButton = styled(PlusButton)`
    margin-left: 3px;
`;

const Count = styled.span`
    font-size: 18px;
`;
