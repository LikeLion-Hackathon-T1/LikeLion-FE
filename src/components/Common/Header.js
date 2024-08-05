import styled from "styled-components";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/cart.svg";
import { ReactComponent as HomeIcon } from "assets/images/home.svg";
import { ReactComponent as Syluv } from "assets/images/syluv-small.svg";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import useCartStore from "hooks/useCartStore";

const Header = ({
    title,
    onLeftClick = () => {},
    backSrc,
    cart = true,
    home = false,
    back = true,
    logo = false,
    rightText = "",
    rightDisabled = false,
    handleRight = () => {},
}) => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [cartLength, setCartLength] = useState(0);

    const { data } = useQuery({
        queryKey: ["get-markets"],
        queryFn: () => syluvAxios.get(`/cart`),
    });

    useEffect(() => {
        if (data) {
            setCartLength(data.data.payload.length);
        }
    }, [data]);

    return (
        <>
            <Spacer />
            <Container>
                <LeftSection>
                    {back && (
                        <BackButton
                            onClick={() => {
                                if (backSrc) {
                                    navigate(backSrc, {
                                        replace: true,
                                    });
                                } else if (onLeftClick) {
                                    onLeftClick();
                                }
                            }}
                        >
                            <BackIcon />
                        </BackButton>
                    )}
                    {logo && <Syluv />}
                </LeftSection>
                <Title>{title}</Title>
                <RightSection>
                    {home && (
                        <Cart onClick={() => navigate("/")}>
                            <HomeIcon />
                        </Cart>
                    )}
                    {cart && (
                        <Cart onClick={() => navigate("/cart")}>
                            <CartIcon />
                            {cartLength > 0 && (
                                <div className="cart-num">
                                    <span>{cartLength}</span>
                                </div>
                            )}
                        </Cart>
                    )}
                    {rightText && (
                        <RightText
                            onClick={handleRight}
                            disabled={rightDisabled}
                        >
                            {rightText}
                        </RightText>
                    )}
                </RightSection>
            </Container>
        </>
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
    position: fixed;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    width: 440px;
    background-color: white;
    top: 0;
    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }
    z-index: 100;
`;
const Spacer = styled.div`
    width: 1px;
    height: 52px;
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
    gap: 10px;
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
    .cart-num {
        position: absolute;
        top: -2px;
        right: -6px;
        background-color: ${({ theme }) => theme.color.primary};
        color: white;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        font-size: 8px;
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
`;

export default Header;
