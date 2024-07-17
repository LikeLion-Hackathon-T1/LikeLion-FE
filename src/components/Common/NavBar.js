import React from "react";
import styled from "styled-components";

const NavBar = ({ items, selected, handleSelected }) => {
    return (
        <NavBarContainer>
            {items.map((item, index) => (
                <NavItem
                    key={index}
                    isSelected={selected === item}
                    onClick={() => handleSelected(item)}
                >
                    {item}
                </NavItem>
            ))}
        </NavBarContainer>
    );
};

const NavBarContainer = styled.div`
    display: flex;
    justify-content: start;
    margin-top: 20px;
    margin-left: 10px;
`;

const NavItem = styled.div`
    margin-right: 20px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) => (props.isSelected ? "black" : "gray")};
    border-bottom: 2px solid
        ${(props) => (props.isSelected ? "black" : "transparent")};
`;

export default NavBar;
