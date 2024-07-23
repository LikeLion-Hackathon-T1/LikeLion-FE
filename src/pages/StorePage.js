import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "../components/Store/MenuItem";
import ReviewItem from "../components/Store/ReviewItem";
import StoreInfo from "../components/Store/StoreInfo";
import reviewImage1 from "../assets/images/menu_gimbap.png";
import reviewImage2 from "../assets/images/menu_gimbap.png";
import reviewImage3 from "../assets/images/menu_gimbap.png";
import menuImage from "../assets/images/menu_gimbap.png";

const PageWrapper = styled.div`
  font-family: "Pretendard", sans-serif;
  padding: 0;
  margin: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: white; // 배경색을 흰색으로 설정하여 회색 부분 제거
  padding: 0; // 불필요한 여백 제거
  border-top: none;
  box-shadow: none;
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0; // 불필요한 여백 제거
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-weight: ${({ theme, active }) =>
    active ? theme.fontWeight.semiBold : theme.fontWeight.regular};
  color: ${({ theme, active }) =>
    active
      ? theme.color.gray900
      : theme.color.gray300}; // 활성화 여부에 따른 색상 설정
  font-size: 18px;
  padding-bottom: 15px;
  cursor: pointer;
  position: relative; // ::after 요소 위치를 relative로 설정
  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    display: block;
    width: 145.24px; // 넓이를 145.24px로 설정
    height: 0; // 높이를 0으로 설정
    border-bottom: 2px solid black; // 하단 검정 줄
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    visibility: ${({ active }) =>
      active ? "visible" : "hidden"}; // active일 때만 보이게 설정
  }
`;

const Section = styled.section`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE 및 Edge
  scrollbar-width: none; // Firefox
`;

const reviewsData = [
  {
    reviewer: "박*연",
    rating: 4.2,
    comment: "소문대로 맛있네요",
    image: reviewImage1,
    helpfulness: 12,
    time: "4시간",
    response: "",
  },
  {
    reviewer: "박*연",
    rating: 4.2,
    comment: "맛있네요",
    image: reviewImage2,
    helpfulness: 12,
    time: "4시간",
    response: "",
  },
  {
    reviewer: "박*연",
    rating: 4.2,
    comment: "맛있네요",
    image: reviewImage3,
    helpfulness: 12,
    time: "4시간",
    response:
      "고객님 맘에 드셨다니 다행이에요^^ 항상 더 노력하는 원조 참치 어쩌구 되겠습니다~",
  },
];

const StorePage = () => {
  const [activeSection, setActiveSection] = useState("menu");

  const menuItems = [
    {
      name: "치즈 참치 김밥",
      price: 2500,
      image: menuImage,
      description: "원조 치즈 참치 김밥",
    },
    {
      name: "잡채 김밥",
      price: 2500,
      image: menuImage,
      description: "가나다라마바사아자카타타파하 어린이들은 가라~어른의 맛",
    },
    {
      name: "잡채 김밥",
      price: 2500,
      image: menuImage,
      description: "가나다라마바사아자카타타파하 어린이들은 가라~어른의 맛",
    },
  ];

  return (
    <PageWrapper>
      <StoreInfo />
      <Nav>
        <NavButton
          active={activeSection === "menu"}
          onClick={() => setActiveSection("menu")}
        >
          메뉴
        </NavButton>
        <NavButton
          active={activeSection === "review"}
          onClick={() => setActiveSection("review")}
        >
          리뷰
        </NavButton>
      </Nav>
      {activeSection === "menu" && (
        <Section>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </Section>
      )}
      {activeSection === "review" && (
        <Section>
          {reviewsData.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </Section>
      )}
    </PageWrapper>
  );
};

export default StorePage;
