import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
    activeSection === "리뷰" ? "20px 20px 0px 20px" : "20px"};
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
  const { storeId } = useParams();
  const axiosInstance = useSyluvAxios();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [menuId, setMenuId] = useState(null);

  useEffect(() => {
    console.log("Selected Menu:", selectedMenu);
  }, [selectedMenu]);

  // 가게 및 메뉴 데이터를 가져오는 함수
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

  // 리뷰 데이터를 가져오는 함수
  const fetchReviewData = async () => {
    try {
      const response = await axiosInstance.get("/review", {
        params: { storeId },
      });
      console.log("리뷰 데이터를 가져오는 중, 가게 ID:", storeId);
      console.log("전체 리뷰 데이터 응답:", response.data);

      if (response.data && response.data.payload) {
        console.log("리뷰 데이터 페이로드:", response.data.payload);

        // 'likeCount'를 문자열에서 숫자로 변환
        const updatedPayload = response.data.payload.map((review) => ({
          ...review,
          likeCount: parseInt(review.likeCount, 10), // 문자열을 숫자로 변환
        }));

        return updatedPayload;
      } else {
        console.error("잘못된 리뷰 데이터 응답", response);
        throw new Error("잘못된 리뷰 데이터 응답");
      }
    } catch (error) {
      console.error("리뷰 데이터 가져오기 오류:", error);
      throw error;
    }
  };

  // 가게 및 메뉴 데이터를 가져오는 쿼리
  const {
    data: storeData,
    error: storeError,
    isError: isStoreError,
    isLoading: isStoreLoading,
  } = useQuery({
    queryKey: ["storeAndMenuData", storeId],
    queryFn: fetchStoreAndMenuData,
  });

  // 리뷰 데이터를 가져오는 쿼리
  const {
    data: reviewData,
    error: reviewError,
    isError: isReviewError,
    isLoading: isReviewLoading,
  } = useQuery({
    queryKey: ["reviewData", storeId],
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

  // 리뷰 삭제 핸들러
  const handleReviewDelete = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== reviewId)
    );
  };

  // 도움이 돼요 클릭 핸들러
  const handleReviewHelpful = (reviewId) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) => {
        if (review.reviewId === reviewId) {
          return {
            ...review,
            likeCount: review.likeCount + 1,
            HelpfulYn: true,
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

  // 리뷰 데이터를 설정하는 효과
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
    return <div>데이터를 가져오는 중 오류가 발생했습니다</div>;
  }

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setMenuId(menu.menuId); // 메뉴 클릭 시 menuId를 설정합니다
  };

  let isFirstMyReview = true; // 첫 번째 본인의 리뷰인지 확인하는 플래그

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
                reviews.map((review, index) => {
                  const isFirst = isFirstMyReview && review.isMine;
                  if (isFirst) {
                    isFirstMyReview = false;
                  }
                  return (
                    <ReviewItem
                      key={index}
                      review={review}
                      isFirst={isFirst}
                      onDelete={handleReviewDelete}
                      onHelpful={handleReviewHelpful}
                    />
                  );
                })
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
  margin-top: 80px;
  margin-bottom: 80px;
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
