import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import menuImage from "../../assets/images/gimbap1.png";

const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  background-color: white;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 182px;
  overflow: hidden;
  margin-bottom: 14px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: auto;
  margin-right: 15px;
  width: 126px;
  height: 30px;
`;

const QuantityButton = styled.button`
  width: 126px;
  height: 30px;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
`;

const Quantity = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin: 0 10px;
  width: 80px; // 수량 넣을 떄 개가 뒤로 밀려서 넓이 설정
`;

const MenuItemDetail = () => {
  const { menuItemId } = useParams();
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
        <Image src={menuItem.image} alt={menuItem.name} />
      </ImageContainer>
      <Title>{menuItem.name}</Title>
      <Description>{menuItem.description}</Description>
      <QuantityContainer>
        <span>수량</span>
        <div>
          <QuantityWrapper>
            <QuantityButton onClick={handleDecrease}>-</QuantityButton>
            <Quantity>{quantity}개</Quantity>
            <QuantityButton onClick={handleIncrease}>+</QuantityButton>
          </QuantityWrapper>
        </div>
      </QuantityContainer>
    </Container>
  );
};

export default MenuItemDetail;
