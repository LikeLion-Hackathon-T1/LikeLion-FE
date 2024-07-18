import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StoreHeader = ({
    name,
    imgSrc = "https://via.placeholder.com/480",
    storeSrc = "/",
}) => {
    const navigate = useNavigate();

    return (
        <Container>
            <StoreImage src={imgSrc} alt="Store Image" />
            <StoreName onClick={() => navigate(storeSrc)}>
                {name} &gt;
            </StoreName>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const StoreImage = styled.img`
    width: 20px;
    height: 20px;
`;

const StoreName = styled.span`
    font-size: 14px;
    cursor: pointer;
`;

export default StoreHeader;
