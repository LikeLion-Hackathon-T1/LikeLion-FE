import styled from "styled-components";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/cart.svg";
import { ReactComponent as HomeIcon } from "assets/images/home.svg";
import { ReactComponent as Syluv } from "assets/images/syluv-small.svg";
import { useNavigate } from "react-router-dom";
// import useCartStore from "hooks/useCartStore";

const Header = ({
  title,
  backSrc = -1,
  cart = true,
  home = false,
  back = true,
  logo = false,
  rightText = "",
  rightDisabled = false,
  handleRight = () => {},
}) => {
  const navigate = useNavigate();
  // const totalItemCount = useCartStore((state) => state.totalItemCount);

  return (
    <>
      <Spacer />
      <Container>
        <LeftSection>
          {back && (
            <BackButton
              onClick={() =>
                navigate("/", {
                  replace: true,
                })
              }
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
            </Cart>
          )}
          {rightText && (
            <RightText onClick={handleRight} disabled={rightDisabled}>
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
`;

export default Header;
