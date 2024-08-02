import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MenuItem from "../components/Store/MenuItem";
import ReviewItem from "../components/Store/ReviewItem";
import StoreInfo from "../components/Store/StoreInfo";
import NavBar from "../components/Common/NavBar.js";
import useSyluvAxios from "hooks/useSyluvAxios";
import MenuItemDetail from "components/Store/MenuItemDetail";
import Splash from "components/Common/Splash";
import EmptyReviewImage from "assets/images/image.svg";

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
  padding: ${({ activeSection }) =>
    activeSection === "리뷰" ? "0 20px 0px 20px" : "20px"};
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; // IE 및 Edge
  scrollbar-width: none; // Firefox
`;

const StorePage = () => {
  const [activeSection, setActiveSection] = useState("메뉴");
  const navigate = useNavigate();
  const { storeId } = useParams(); // menuId는 직접 사용하지 않습니다
  const axiosInstance = useSyluvAxios();
  const queryClient = useQueryClient();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menuId, setMenuId] = useState(null); // menuId 상태를 추가합니다

  useEffect(() => {
    console.log("Selected Menu:", selectedMenu);
  }, [selectedMenu]);

  const fetchStoreAndMenuData = async () => {
    try {
      const response = await axiosInstance.get("/store/info");
      console.log("Full Store and Menu Data Response:", response.data);
      if (response.data && response.data.payload) {
        const store = response.data.payload.find(
          (item) => item.storeId === parseInt(storeId)
        );
        if (store) {
          console.log("Store Data:", store);
          // 메뉴의 첫 번째 항목의 menuId를 설정합니다 (필요에 따라 변경 가능)
          if (store.menuDetails && store.menuDetails.length > 0) {
            setMenuId(store.menuDetails[0].menuId);
          }
          return store;
        } else {
          console.error("Store not found");
          throw new Error("Store not found");
        }
      } else {
        console.error("Invalid store data response", response);
        throw new Error("Invalid store data response");
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
      throw error;
    }
  };

  const fetchReviewData = async () => {
    try {
      if (!menuId) {
        throw new Error("Menu ID is not defined");
      }
      const response = await axiosInstance.get(`/review/${menuId}`, {
        params: { storeId },
      });
      console.log("Fetching reviews for store ID:", storeId);
      console.log("Full Review Data Response:", response.data);
      if (response.data && response.data.payload) {
        console.log("Review Data Payload:", response.data.payload);
        return response.data.payload;
      } else {
        console.error("Invalid review data response", response);
        throw new Error("Invalid review data response");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      throw error;
    }
  };

  const {
    data: storeData,
    error: storeError,
    isError: isStoreError,
    isLoading: isStoreLoading,
  } = useQuery({
    queryKey: ["storeAndMenuData", storeId],
    queryFn: fetchStoreAndMenuData,
  });

  const {
    data: reviewData,
    error: reviewError,
    isError: isReviewError,
    isLoading: isReviewLoading,
  } = useQuery({
    queryKey: ["reviewData", storeId, menuId],
    queryFn: fetchReviewData,
    enabled: !!menuId, // menuId가 있을 때만 실행
    onSuccess: (data) => {
      if (data) {
        const myReview = data.filter((review) => review.isMine);
        const otherReviews = data
          .filter((review) => !review.isMine)
          .sort((a, b) => b.likeCount - a.likeCount);

        setReviews([...myReview, ...otherReviews]);
      }
    },
  });

  const handleReviewDelete = (reviewId, review) => {
    if (reviewId) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
    } else {
      setReviews((prevReviews) => [...prevReviews, review]);
    }
  };

  const handleReviewHelpful = (reviewId) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) => {
        if (review.reviewId === reviewId) {
          return {
            ...review,
            likeCount: review.likeCount + 1,
            isHelpfulClicked: true,
          };
        }
        return review;
      });

      const myReview = updatedReviews.filter((review) => review.isMine);
      const otherReviews = updatedReviews
        .filter((review) => !review.isMine)
        .sort((a, b) => b.likeCount - a.likeCount);

      return [...myReview, ...otherReviews];
    });
  };

  useEffect(() => {
    if (reviewData) {
      console.log("Fetched Review Data:", reviewData);
      const myReview = reviewData.filter((review) => review.isMine);
      const otherReviews = reviewData
        .filter((review) => !review.isMine)
        .sort((a, b) => b.likeCount - a.likeCount);

      setReviews([...myReview, ...otherReviews]);
    }
  }, [reviewData]);

  if (isStoreLoading || isReviewLoading) {
    return <Splash />;
  }

  if (isStoreError || isReviewError) {
    console.error("Error fetching data", { storeError, reviewError });
    return <div>Error fetching data</div>;
  }

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMenuId(menu.menuId); // 메뉴 클릭 시 menuId를 설정합니다
  };

  return selectedMenu ? (
    <MenuItemDetail menu={selectedMenu} onClick={handleMenuClick} />
  ) : (
    <PageWrapper>
      {storeData && (
        <>
          <StoreInfo
            name={storeData.name}
            call={storeData.contact}
            address={storeData.location}
            openHours={storeData.openHours}
            closeHours={storeData.closeHours}
            ratingAvg={storeData.ratingAvg}
            storeImage={storeData.storeImage}
            category={storeData.category}
          />
          <NavBar
            items={["메뉴", "리뷰"]}
            selected={activeSection}
            handleSelected={setActiveSection}
          />
          {activeSection === "메뉴" && (
            <Section activeSection={activeSection}>
              {storeData.menuDetails.map((item, index) => (
                <MenuItem key={index} item={item} onClick={handleMenuClick} />
              ))}
            </Section>
          )}
          {activeSection === "리뷰" && (
            <Section activeSection={activeSection}>
              {Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <ReviewItem
                    key={index}
                    review={review}
                    onDelete={handleReviewDelete}
                    onHelpful={handleReviewHelpful}
                  />
                ))
              ) : (
                <EmptyReviewContainer>
                  <EmptyReviewImageStyled
                    src={EmptyReviewImage}
                    alt="리뷰가 없습니다"
                  />
                  <EmptyReviewText>리뷰가 아직 없어요</EmptyReviewText>
                  <EmptyReviewText>
                    첫 리뷰의 주인공이 돼주세요!
                  </EmptyReviewText>
                </EmptyReviewContainer>
              )}
            </Section>
          )}
        </>
      )}
    </PageWrapper>
  );
};

const EmptyReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 100px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const EmptyReviewImageStyled = styled.img`
  width: 144px;
  height: 124px;
  margin-bottom: 25px;
`;

const EmptyReviewText = styled.p`
  color: ${({ theme }) => theme.color.gray600};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export default StorePage;
