import styled from "styled-components";
import { ReactComponent as BackIcon } from "../../assets/images/back.svg";
import { ReactComponent as CartIcon } from "../../assets/images/cart.svg";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../hooks/useCartStore";
import { useEffect, useState } from "react";

const Header = ({
    title,
    backTitle,
    backSrc = -1,
    cart = true,
    back = true,
}) => {
    const navigate = useNavigate();
    const totalItemCount = useCartStore((state) => state.totalItemCount);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10
            );
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos, isVisible]);

    return (
        <Container visible={isVisible.toString()}>
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
                    <Cart onClick={() => navigate("/cart")}>
                        <CartIcon width="40px" height="40px" />
                        <CartCount>{totalItemCount()}</CartCount>
                    </Cart>
                )}
            </RightSection>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 480px;
    margin: 0 -20px;
    top: 0;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 0px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    //visible 변화시 transition 효과
    transition: top 0.2s;
    ${({ visible }) => (visible === "true" ? "top: 0;" : "top: -60px;")}
    @media (max-width: 480px) {
        width: 100dvw;
    }
`;

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

const Cart = styled.div`
    cursor: pointer;
`;

export default Header;
