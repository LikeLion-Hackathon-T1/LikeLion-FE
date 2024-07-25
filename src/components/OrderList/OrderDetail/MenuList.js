import { GraySpace, ListContainer } from "pages/OrderDetailPage";
import styled from "styled-components";

const MenuList = () => {
    return (
        <ListContainer>
            <GraySpace />
            <MenuContainer>
                <MenuItemContainer>
                    <MenuName>광어 모듬회 세트 1개</MenuName>
                    <MenuPrice>30,000원</MenuPrice>
                </MenuItemContainer>
                <MenuItemContainer>
                    <MenuName>우럭매운탕 1개</MenuName>
                    <MenuPrice>30,000원</MenuPrice>
                </MenuItemContainer>
            </MenuContainer>
        </ListContainer>
    );
};

export default MenuList;

const MenuContainer = styled.div`
    margin-top: 14px;
    padding: 0 20px;
    gap: 28px;
    display: flex;
    flex-direction: column;
`;

const MenuItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MenuName = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const MenuPrice = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
