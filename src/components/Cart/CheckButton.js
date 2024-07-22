import { ReactComponent as CheckIcon } from "assets/images/check.svg";
import { ReactComponent as FillCheckIcon } from "assets/images/check-fill.svg";
import { useCallback } from "react";
import styled from "styled-components";

const CheckButton = ({ isChecked, onClick = () => {} }) => {
    const handleClick = useCallback(() => {
        onClick();
    }, [onClick]);

    return (
        <Container onClick={handleClick}>
            {isChecked ? <FillCheckIcon /> : <CheckIcon />}
        </Container>
    );
};

const Container = styled.div`
    cursor: pointer;
`;

export default CheckButton;
