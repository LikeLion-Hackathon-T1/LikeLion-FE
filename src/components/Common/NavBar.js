import React from "react";
import styled from "styled-components";

const NavBar = ({ items, selected, handleSelected }) => {
    return (
        <NavBarContainer>
            {items.map((item, index) => (
                <NavItem
                    key={index}
                    selected={selected === item}
                    onClick={() => handleSelected(item)}
                >
                    {item}
                </NavItem>
            ))}
        </NavBarContainer>
    );
};

const NavBarContainer = styled.div`
    margin-top: 16px;
    margin-bottom: 29px;
    display: flex;
    justify-content: center;
    height: 36px;
    border-bottom: ${({ theme }) => `1px solid ${theme.color.gray100}`};
`;

const NavItem = styled.div`
    width: 100%;
    margin: 0 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) =>
        props.selected ? props.theme.color.gray900 : props.theme.color.gray300};
    border-bottom: 2px solid
        ${(props) =>
            props.selected ? props.theme.color.gray900 : "transparent"};
`;

export default NavBar;
