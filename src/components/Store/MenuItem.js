import React from "react";
import styled from "styled-components";

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const MenuItemImage = styled.img`
  height: 104px;
  width: 104px;
  border-radius: 12px;
  display: flex;
`;

const MenuItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItemName = styled.h3`
  margin-left: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.gray900};
`;

const MenuItemPrice = styled.p`
  margin-top: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
  margin-left: 12px;
`;

const MenuItemDescription = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray500};
  margin-left: 12px;
  margin-top: 26px;
`;

const MenuItem = ({ name, price, image, description }) => (
  <MenuItemWrapper>
    <MenuItemImage src={image} alt={name} />
    <MenuItemInfo>
      <MenuItemName>{name}</MenuItemName>
      <MenuItemPrice>{price}원</MenuItemPrice>
      {description && <MenuItemDescription>{description}</MenuItemDescription>}
    </MenuItemInfo>
  </MenuItemWrapper>
);

export default MenuItem;