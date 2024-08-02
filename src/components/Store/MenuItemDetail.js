import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import { ReactComponent as CartIcon } from "assets/images/marketbag.svg";
import { ReactComponent as HomeIcon } from "assets/images/newhome.svg";
import useSyluvAxios from "hooks/useSyluvAxios";
import Splash from "components/Common/Splash";
import {
  Container,
  ImageContainer,
  Image,
  BackButton,
  HomeButton,
  CartButton,
  Title,
  Description,
  Line,
  QuantityContainer,
  QuantityLabel,
  QuantityWrapper,
  QuantityButton1,
  QuantityButton2,
  Quantity,
  AddToCartButton,
  ModalBackground,
  ModalContent,
  ModalTitle,
  VisitModal,
  ModalButton,
  CartBadge,
} from "./MenuItemDetailStyle"; // 스타일 컴포넌트 경로에 맞게 수정

const MenuItemDetail = ({ menu, onClick = () => {} }) => {
  const navigate = useNavigate();
  const syluvAxios = useSyluvAxios();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    const menuId = menu?.menuId;
    const menuName = menu?.name;
    if (!menuId || !menuName) {
      console.error("Menu ID 또는 이름이 정의안됨");
      return;
    }

    console.log("Adding to cart...");
    console.log("Menu ID: ", menuId);
    console.log("Menu Name: ", menuName);
    console.log("Quantity: ", quantity);
    try {
      // 현재 장바구니 아이템을 가져옴
      const cartResponse = await syluvAxios.get("/cart");
      const cartItems = cartResponse.data.payload || [];

      console.log("Cart items: ", cartItems);

      // 장바구니에 동일한 메뉴가 있는지 확인
      const existingCartItem = cartItems.find(
        (item) => item.menuName === menuName
      );

      if (existingCartItem) {
        // 동일한 메뉴가 있으면 수량을 업데이트
        const newQuantity = existingCartItem.quantity + quantity;
        console.log("Updating quantity for existing cart item...");
        console.log("Cart ID: ", existingCartItem.cartid);
        console.log("New Quantity: ", newQuantity);
        try {
          const updateResponse = await syluvAxios.put("/cart", {
            cartid: existingCartItem.cartid,
            quantity: newQuantity,
          });
          console.log("Update Response: ", updateResponse.data);

          // 장바구니 다시 불러오기
          const updatedCartResponse = await syluvAxios.get("/cart");
          console.log("Updated Cart items: ", updatedCartResponse.data.payload);
        } catch (updateError) {
          console.error(
            "Update Error: ",
            updateError.response ? updateError.response.data : updateError
          );
        }
      } else {
        // 동일한 메뉴가 없으면 새로운 항목으로 추가
        console.log("Adding new item to cart...");
        try {
          const addResponse = await syluvAxios.post("/cart", {
            menuId: menuId,
            quantity: quantity,
          });
          console.log("Add Response: ", addResponse.data);

          // 장바구니 다시 불러오기
          const updatedCartResponse = await syluvAxios.get("/cart");
          console.log("Updated Cart items: ", updatedCartResponse.data.payload);
        } catch (addError) {
          console.error(
            "Add Error: ",
            addError.response ? addError.response.data : addError
          );
        }
      }

      console.log("장바구니 업데이트 완료");
      setShowModal(true); // 모달 표시
    } catch (err) {
      console.error("에러 발생:", err);
      if (err.response) {
        console.error("Response error:", err.response.data);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!menu) {
    return <Splash />;
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
          {showModal && <CartBadge>{quantity}</CartBadge>}{" "}
          {/* 수량 배지 추가 */}
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
      <AddToCartButton onClick={handleAddToCart}>
        {menu.price}원 담기
      </AddToCartButton>
      {showModal && (
        <ModalBackground show={showModal}>
          <VisitModal>
            <div className="title-text">메뉴가 장바구니에 담겼어요!</div>
            <div className="sub-text">{menu.name}</div>
            <div className="buttons">
              <ModalButton onClick={() => navigate("/cart")}>
                주문하러 가기
              </ModalButton>
              <ModalButton onClick={handleCloseModal}>
                계속 둘러보기
              </ModalButton>
            </div>
          </VisitModal>
        </ModalBackground>
      )}
    </Container>
  );
};

export default MenuItemDetail;
