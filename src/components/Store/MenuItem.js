import React, { useState } from "react";
import styled from "styled-components";
import MenuItemDetail from "./MenuItemDetail";

const MenuItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  cursor: pointer; // 클릭 가능한 커서 추가
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
  margin-top: 10px;
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
  margin-top: 40px;
`;

const MenuItem = ({ item, onClick }) => {
  return (
    <MenuItemWrapper
      onClick={() => {
        onClick(item);
      }}
    >
      <MenuItemImage src={item.menuImage} alt={item.name} />
      <MenuItemInfo>
        <MenuItemName>{item.name}</MenuItemName>
        <MenuItemPrice>{item.price}원</MenuItemPrice>
        {item.content && (
          <MenuItemDescription>{item.content}</MenuItemDescription>
        )}
      </MenuItemInfo>
    </MenuItemWrapper>
  );
};

export default MenuItem;
