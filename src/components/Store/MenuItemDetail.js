import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/marketbag.svg";
import { ReactComponent as HomeIcon } from "assets/images/newhome.svg";

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  background-color: white;
  padding-bottom: 120px;
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 14px;
  position: relative;
  height: 272px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  padding: 8px;
`;

const HomeButton = styled.div`
  position: absolute;
  top: 16px;
  right: calc(20px + 32px + 12px);
  cursor: pointer;
  padding: 8px;
`;

const CartButton = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 12px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-left: 20px;
`;

const Line = styled.div`
  width: 80%;
  align-content: center;
  height: 1px;
  background-color: #cccccc;
  margin-top: 16px;
  position: fixed;
  bottom: 136px;
  left: 0;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 70px;
  width: 440px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 20px;
  background-color: white;
  border-radius: 8px;
`;

const QuantityLabel = styled.span`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 4px;
  padding: 5px 5px;
  width: 110px;
  height: 28px;
`;

const QuantityButton1 = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: #cccccc;
`;

const QuantityButton2 = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: 40px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray800};
`;

const AddToCartButton = styled.button`
  width: 440px;
  height: 48px;
  background-color: #ff6b00;
  color: white;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border: none;
  border-radius: 8px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const MenuItemDetail = ({ menu, onClick = () => {} }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!menu) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <ImageContainer>
        <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
          <BackIcon />
        </BackButton>
        <HomeButton onClick={() => navigate("/")} aria-label="홈으로">
          <HomeIcon />
        </HomeButton>
        <CartButton onClick={() => navigate("/cart")} aria-label="장바구니로">
          <CartIcon />
        </CartButton>
        <Image src={menu.menuImage} alt={menu.name} />
      </ImageContainer>
      <Title>{menu.name}</Title>
      <Description>{menu.content}</Description>
      <Line />
      <QuantityContainer>
        <QuantityLabel>수량</QuantityLabel>
        <QuantityWrapper>
          <QuantityButton1 onClick={handleDecrease} aria-label="수량 줄이기">
            -
          </QuantityButton1>
          <Quantity>{quantity}</Quantity>
          <QuantityButton2 onClick={handleIncrease} aria-label="수량 늘리기">
            +
          </QuantityButton2>
        </QuantityWrapper>
      </QuantityContainer>
      <AddToCartButton onClick={() => onClick(null)}>
        {menu.price}원 담기
      </AddToCartButton>
    </Container>
  );
};

export default MenuItemDetail;
