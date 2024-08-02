import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CheckButton from "./CheckButton";
import { useEffect, useState } from "react";

const StoreHeader = ({ name, isChecked, onCheck }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleClick = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        onCheck(newChecked);
    };

    return (
        <Header>
            <Container>
                <CheckButton isChecked={checked} onClick={handleClick} />
                <StoreName>{name}</StoreName>
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
`;

export default StoreHeader;
