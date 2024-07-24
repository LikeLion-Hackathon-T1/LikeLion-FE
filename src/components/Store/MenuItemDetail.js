import React, { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import menuImage from "../../assets/images/gimbap1.png";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import cartIcon from "assets/images/cart.png";

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  background-color: white;
  padding-bottom: 70px; // 버튼 영역을 고려한 패딩
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
  width: 40px; // 수량 넣을 때 "개"가 뒤로 밀려서 넓이 설정
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

const MenuItemDetail = () => {
  const { menuItemId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // 예시 데이터
  const menuItems = [
    {
      id: 1,
      name: "치즈 참치 김밥",
      price: 2500,
      image: menuImage,
      description: "원조 치즈 김밥",
    },
  ];

  const menuItem = menuItems.find((item) => item.id === parseInt(menuItemId));

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!menuItem) {
    return <div>메뉴 아이템을 찾을 수 없습니다.</div>;
  }

  return (
    <Container>
      <ImageContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
        <CartButton>
          <img src={cartIcon} alt="cart" />
        </CartButton>
        <Image src={menuItem.image} alt={menuItem.name} />
      </ImageContainer>
      <Title>{menuItem.name}</Title>
      <Description>{menuItem.description}</Description>
      <QuantityContainer>
        <QuantityLabel>수량</QuantityLabel>
        <QuantityWrapper>
          <QuantityButton onClick={handleDecrease}>-</QuantityButton>
          <Quantity>{quantity}개</Quantity>
          <QuantityButton onClick={handleIncrease}>+</QuantityButton>
        </QuantityWrapper>
      </QuantityContainer>
      <AddToCartButton>{menuItem.price}원 담기</AddToCartButton>
    </Container>
  );
};

export default MenuItemDetail;
