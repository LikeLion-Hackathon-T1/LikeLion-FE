import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "../components/Store/MenuItem";
import ReviewItem from "../components/Store/ReviewItem";
import StoreInfo from "../components/Store/StoreInfo";
import NavBar from "../components/Common/NavBar.js";
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
    menu: "어묵 참치김밥",
    images: [reviewImage1, reviewImage2, reviewImage3], // 이미지 배열 추가
    helpfulness: 12,
    time: "4시간",
    response: "",
  },
  {
    reviewer: "박*연",
    rating: 4.2,
    comment: "맛있네요",
    menu: "어묵 참치김밥",
    images: [reviewImage1], // 이미지 배열 추가
    helpfulness: 12,
    time: "4시간",
    response: "",
  },
  {
    reviewer: "박*연",
    rating: 4.2,
    comment: "맛있네요",
    menu: "어묵 참치김밥",
    images: [], // 이미지가 없는 경우
    helpfulness: 12,
    time: "4시간",
    response:
      "고객님 맘에 드셨다니 다행이에요^^ 항상 더 노력하는 원조 참치 어쩌구 되겠습니다~",
  },
];

const StorePage = () => {
  const [activeSection, setActiveSection] = useState("메뉴");

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
      description: "어린이들은 가라~어른의 맛",
    },
    {
      name: "잡채 김밥",
      price: 2500,
      image: menuImage,
      description: "어린이들은 가라~어른의 맛",
    },
  ];

  const navItems = ["메뉴", "리뷰"];

  return (
    <PageWrapper>
      <StoreInfo />
      <NavBar
        items={navItems}
        selected={activeSection}
        handleSelected={setActiveSection}
      />
      {activeSection === "메뉴" && (
        <Section>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </Section>
      )}
      {activeSection === "리뷰" && (
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
