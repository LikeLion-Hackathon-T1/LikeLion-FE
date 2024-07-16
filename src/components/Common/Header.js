import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/images/back.svg";
import { ReactComponent as CartIcon } from "../../assets/images/cart.svg";
import { useNavigate } from "react-router-dom";

const Header = ({
    title,
    backTitle,
    backSrc = -1,
    cart = true,
    back = true,
}) => {
    const navigate = useNavigate();

    return (
        <Container>
            <LeftSection>
                {back && (
                    <BackButton onClick={() => navigate(backSrc)}>
                        <BackIcon />
                        {backTitle && <BackTitle>{backTitle}</BackTitle>}
                    </BackButton>
                )}
            </LeftSection>
            <Title>{title}</Title>
            <RightSection>
                {cart && <Cart onClick={() => navigate("/cart")} />}
            </RightSection>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 50px;
    margin-bottom: 20px;
`;

const LeftSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const BackButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const BackTitle = styled.h2`
    font-size: 12px;
    margin-left: 8px;
`;

const Title = styled.h1`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 15px;
    font-weight: bold;
`;

const Cart = styled(CartIcon)`
    cursor: pointer;
`;

export default Header;
