import React from "react";
import styled from "styled-components";

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const MenuItemImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`;

const MenuItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItemName = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const MenuItemPrice = styled.p`
  margin: 0;
  font-size: 0.9em;
  color: #888;
`;

const MenuItemDescription = styled.p`
  margin: 5px 0 0 0;
  font-size: 0.8em;
  color: #888;
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
