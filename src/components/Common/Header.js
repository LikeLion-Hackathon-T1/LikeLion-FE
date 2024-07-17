import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/images/back.svg";
import { ReactComponent as CartIcon } from "../../assets/images/cart.svg";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../hooks/useCartStore";

const Header = ({
    title,
    backTitle,
    backSrc = -1,
    cart = true,
    back = true,
}) => {
    const navigate = useNavigate();
    const totalItemCount = useCartStore((state) => state.totalItemCount);

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
                {cart && (
                    <>
                        <Cart
                            width="40px"
                            height="40px"
                            onClick={() => navigate("/cart")}
                        />
                        <CartCount>{totalItemCount()}</CartCount>
                    </>
                )}
            </RightSection>
        </Container>
    );
};

const CartCount = styled.span`
    position: absolute;
    top: 30px;
    right: 20px;
    background-color: red;
    border-radius: 10px;
    color: white;
    padding: 2px 2px 0px 2px;
    font-size: 11px;
    font-weight: 900;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 5dvh;
    margin-bottom: 2dvh;
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
