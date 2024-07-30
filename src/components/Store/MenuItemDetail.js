import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import menuImage from "../../assets/images/gimbap1.png";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import cartIcon from "../../assets/images/marketbag.svg";
import HomeIcon from "../../assets/images/newhome.svg";
import useSyluvAxios from "hooks/useSyluvAxios";

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  background-color: white;
  padding-bottom: 70px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 182px;
  overflow: hidden;
  margin-bottom: 14px;
  position: relative;
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

const CartButton = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
`;

const HomeButton = styled.div`
  position: absolute;
  top: 16px;
  right: calc(20px + 32px + 12px);
  padding: 8px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 12px;
  margin-left: 20px;
  margin-top: 14px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-bottom: 48px;
  margin-left: 20px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: auto;
  margin-right: 15px;
  width: 126px;
  height: 30px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 24px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin: 0 10px;
  width: 40px;
  text-align: center;
`;

const QuantityLabel = styled.span`
  margin-left: 0px;
`;

const AddToCartButton = styled.button`
  width: 450px;
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
  const [menuItem, setMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPutClick = () => {
    onClick(null);
  };

  return (
    <Container>
      <ImageContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
        <CartButton>
          <img src={cartIcon} alt="cart" />
        </CartButton>
        <HomeButton>
          <img src={HomeIcon} alt="home" />
        </HomeButton>
        <Image src={menu.menuImage} alt={menu.name} />
      </ImageContainer>
      <Title>{menu.name}</Title>
      <Description>{menu.content}</Description>
      <QuantityContainer>
        <QuantityLabel>수량</QuantityLabel>
        <QuantityWrapper>
          <QuantityButton onClick={handleDecrease}>-</QuantityButton>
          <Quantity>{quantity}개</Quantity>
          <QuantityButton onClick={handleIncrease}>+</QuantityButton>
        </QuantityWrapper>
      </QuantityContainer>
      <AddToCartButton onClick={() => onClick(null)}>
        {menu.price}원 담기
      </AddToCartButton>
    </Container>
  );
};

export default MenuItemDetail;
