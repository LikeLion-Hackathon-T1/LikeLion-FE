import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CheckButton from "./CheckButton";
import useCartStore from "hooks/useCartStore";
import { useEffect, useState } from "react";

const StoreHeader = ({ name, storeSrc = "/" }) => {
    const navigate = useNavigate();
    const { clickStore, isStoreClicked, removeClickedStore } = useCartStore();
    const [isChecked, setIsChecked] = useState(false);

    const storeIsClicked = isStoreClicked(name);

    useEffect(() => {
        setIsChecked(storeIsClicked);
    }, [storeIsClicked]);

    const handleClick = () => {
        if (isChecked) {
            removeClickedStore(name);
        } else {
            clickStore(name);
        }
        setIsChecked(!isChecked);
    };

    return (
        <Header>
            <Container>
                <CheckButton isChecked={isChecked} onClick={handleClick} />
                <StoreName onClick={() => navigate(storeSrc)}>{name}</StoreName>
            </Container>
        </Header>
    );
};

const Header = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    height: 47px;
    display: flex;
    align-items: center;
`;

const Container = styled.div`
    margin: 0px 20px;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const StoreName = styled.span`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    cursor: pointer;
`;

export default StoreHeader;
