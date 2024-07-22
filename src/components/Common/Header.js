import styled from "styled-components";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/cart.svg";
import { useNavigate } from "react-router-dom";
// import useCartStore from "hooks/useCartStore";

const Header = ({
    title,
    backSrc = -1,
    cart = true,
    back = true,
    rightText = "",
    rightDisabled = false,
    handleRight = () => {},
}) => {
    const navigate = useNavigate();
    // const totalItemCount = useCartStore((state) => state.totalItemCount);

    return (
        <Container>
            <LeftSection>
                {back && (
                    <BackButton onClick={() => navigate(backSrc)}>
                        <BackIcon />
                    </BackButton>
                )}
            </LeftSection>
            <Title>{title}</Title>
            <RightSection>
                {cart && (
                    <Cart onClick={() => navigate("/cart")}>
                        <CartIcon width="40px" height="40px" />
                    </Cart>
                )}
                {rightText && (
                    <RightText onClick={handleRight} disabled={rightDisabled}>
                        {rightText}
                    </RightText>
                )}
            </RightSection>
        </Container>
    );
};

const RightText = styled.div`
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    color: ${({ theme, disabled }) =>
        disabled ? theme.color.gray400 : theme.color.primary};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Container = styled.div`
    margin: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    background-color: #fff;
`;

// const CartCount = styled.span`
//     position: absolute;
//     top: 25px;
//     right: 0px;
//     background-color: red;
//     border-radius: 10px;
//     color: white;
//     padding: 2px 2px 0px 2px;
//     font-size: 11px;
//     font-weight: 900;
//     text-align: center;
// `;

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

const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.title};
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Cart = styled.div`
    cursor: pointer;
    position: relative;
`;

export default Header;
