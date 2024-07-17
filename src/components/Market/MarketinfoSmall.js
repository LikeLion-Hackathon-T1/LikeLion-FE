import styled from "styled-components";

const MarketInfoSmall = ({ name, desc, imgSrc }) => {
    return (
        <ItemContainer>
            <MenuImage src={imgSrc} alt="메뉴 이미지" />
            <ItemInfo>
                <ItemTitle>{name}</ItemTitle>
                {desc && <ItemDescription>{desc}</ItemDescription>}
            </ItemInfo>
        </ItemContainer>
    );
};

export default MarketInfoSmall;

const ItemContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const ItemDescription = styled.span`
    margin-top: 6%;
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
