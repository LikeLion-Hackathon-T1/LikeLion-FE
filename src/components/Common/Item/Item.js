import styled from "styled-components";

const Item = ({ price, name, ImgSrc }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price) + "원";
    };

    return (
        <ItemContainer>
            <MenuImage src={ImgSrc} alt="메뉴 이미지" />
            <ItemInfo>
                <ItemTitle>{name}</ItemTitle>
                <ItemPrice>가격: {price && formatPrice(price)}</ItemPrice>
            </ItemInfo>
        </ItemContainer>
    );
};

export default Item;

const ItemContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const MenuImage = styled.img`
    width: 104px;
    height: 104px;
    border-radius: 12px;
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ItemTitle = styled.div`
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    color: ${({ theme }) => theme.color.gray900};
`;

const ItemPrice = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray500};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
