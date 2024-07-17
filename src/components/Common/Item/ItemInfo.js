import styled from "styled-components";

const Item = ({ price, name, desc, ImgSrc }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price) + "원";
    };

    return (
        <ItemContainer>
            <MenuImage src={ImgSrc} alt="메뉴 이미지" />
            <ItemInfo>
                <ItemTitle>{name}</ItemTitle>
                <ItemPrice>{formatPrice(price)}</ItemPrice>
                {desc && <ItemDescription>{desc}</ItemDescription>}
            </ItemInfo>
        </ItemContainer>
    );
};

export default Item;

const ItemContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const ItemDescription = styled.span`
    margin-top: 15px;
    font-size: 11px;
    color: #666;
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
