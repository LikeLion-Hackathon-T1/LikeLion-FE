import React, { useState } from "react";
import styled from "styled-components";
import defaultImage from "assets/images/syrup_icon.svg";

const MenuItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 28px;
    cursor: pointer;
`;

const MenuItemImage = styled.img`
    height: 104px;
    width: 104px;
    border-radius: 12px;
    display: flex;
    object-fit: cover;
    min-width: 104px;
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
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const imageSrc = item.menuImage ? item.menuImage : defaultImage;

    return (
        <MenuItemWrapper
            onClick={() => {
                if (onClick) {
                    onClick(item);
                }
            }}
        >
            <MenuItemImage src={imageSrc} alt={item.name} />
            <MenuItemInfo>
                <MenuItemName>{item.name}</MenuItemName>
                <MenuItemPrice>{formatPrice(item.price)}원</MenuItemPrice>
                {item.content && (
                    <MenuItemDescription>{item.content}</MenuItemDescription>
                )}
            </MenuItemInfo>
        </MenuItemWrapper>
    );
};

export default MenuItem;
