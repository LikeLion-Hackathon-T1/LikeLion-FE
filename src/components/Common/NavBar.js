import React from "react";
import styled from "styled-components";
import { ReactComponent as DotIcon } from "assets/images/dot.svg";

const NavBar = ({
    items,
    selected,
    handleSelected,
    num = 0,
    margin = true,
}) => {
    return (
        <NavBarContainer className={`${margin ? margin : ""}`}>
            {items.map((item, index) => (
                <NavItem
                    key={index}
                    selected={selected === item}
                    onClick={() => handleSelected(item)}
                >
                    {item}
                    {index === 1 && num > 0 && <DotIcon />}
                </NavItem>
            ))}
        </NavBarContainer>
    );
};

const NavBarContainer = styled.div`
    margin-top: 16px;

    display: flex;
    justify-content: center;
    height: 36px;
    border-bottom: ${({ theme }) => `1px solid ${theme.color.gray100}`};

    .margin {
        margin-bottom: 29px;
    }
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
    position: relative;

    svg {
        position: relative;
        bottom: 10px;
    }
`;

export default NavBar;
