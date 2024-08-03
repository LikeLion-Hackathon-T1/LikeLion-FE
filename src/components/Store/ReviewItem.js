import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  ReviewContainer,
  Header,
  UserInfo,
  UserProfileImage,
  UserName,
  StarsAndTime,
  StarContainer,
  Star,
  Time,
  DeleteButton,
  ReviewImageContainerSingle,
  ReviewImageContainerMultiple,
  SingleReviewImage,
  MultipleReviewImage,
  MenuName,
  ReviewText,
  Helpfulness,
  HelpfulButton,
  Icon,
  ReviewResponse,
  ResponseHeader,
  ResponseTitle,
  ResponseTime,
  ResponseText,
  MyReviewContainer,
  MyReviewText,
} from "./ReviewItemStyle";

import useSyluvAxios from "../../hooks/useSyluvAxios";
import goodIcon from "../../assets/images/good.png";
import badIcon from "../../assets/images/bad.png"; // badIcon 이미지 추가

const formatTime = ({ beforeHours, beforeDay, beforeWeek }) => {
  if (beforeWeek > 0) {
    return `${beforeWeek}주 전`;
  } else if (beforeDay > 0) {
    return `${beforeDay}일 전`;
  } else if (beforeHours > 0) {
    return `${beforeHours}시간 전`;
  } else {
    return `방금 전`;
  }
};

const ReviewItem = ({
  review,
  isFirst,
  isLastMyReview,
  isFirstOtherReview,
  onDelete,
  onHelpful,
}) => {
  const [helpfulness, setHelpfulness] = useState(Number(review.helpfulCnt));
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(review.helpfulYn);

  const syluvAxios = useSyluvAxios();

  useEffect(() => {
    setHelpfulness(Number(review.helpfulCnt));
    setIsHelpfulClicked(review.helpfulYn);
  }, [review.helpfulCnt, review.helpfulYn]);

  const handleHelpfulnessClick = async () => {
    console.log("handleHelpfulnessClick called"); // 함수 호출 여부 확인

    if (isHelpfulClicked) {
      console.log("이미 누른 리뷰입니다.");
      return;
    }

    console.log("도움이 돼요 클릭됨");
    setIsHelpfulClicked(true);
    setHelpfulness((prevHelpfulness) => prevHelpfulness + 1);

    try {
      console.log("도움이 돼요 요청 시작");
      const response = await syluvAxios.post(`/review/${review.reviewId}/like`);
      const result = response.data;
      console.log("서버 응답:", result);
      if (result.result.code !== 0) {
        // 서버 응답이 실패한 경우 상태 되돌립니다
        console.log("서버 응답 실패:", result);
        setHelpfulness((prevHelpfulness) => prevHelpfulness - 1);
        setIsHelpfulClicked(false);
      } else {
        console.log("서버 응답 성공:", result);
        onHelpful(review.reviewId);
      }
    } catch (error) {
      console.error("도움이 돼요 요청 중 오류 발생:", error);
      // 서버 요청 중 오류 발생 시 상태 되돌립니다
      setHelpfulness((prevHelpfulness) => prevHelpfulness - 1);
      setIsHelpfulClicked(false);
    }
  };

  const handleDelete = useCallback(() => {
    onDelete(review.reviewId);
    syluvAxios
      .delete(`/review/${review.reviewId}/delete`)
      .then((response) => {
        const result = response.data;
        if (result && result.result && result.result.code === 0) {
          console.log("리뷰가 정상적으로 삭제되었습니다:", result.payload);
        } else {
          console.error("리뷰 삭제 중 오류 발생:", result);
        }
      })
      .catch((error) => {
        console.error("리뷰 삭제 요청 중 오류 발생:", error);
      });
  }, [review.reviewId, onDelete, syluvAxios]);

  return (
    <ReviewContainer
      isMine={review.isMine}
      isLastMyReview={isLastMyReview}
      isFirstOtherReview={isFirstOtherReview}
    >
      {isFirst && review.isMine && (
        <MyReviewContainer>
          <MyReviewText>내가 남긴 리뷰</MyReviewText>
        </MyReviewContainer>
      )}
      <Header>
        <UserInfo>
          <UserProfileImage src={review.picture} alt="User Profile" />
          <div>
            <UserName>{review.name}</UserName>
            <StarsAndTime>
              <StarContainer>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    $filled={(index < review.rating).toString()}
                  >
                    ★
                  </Star>
                ))}
              </StarContainer>
              <Time>
                {formatTime({
                  beforeHours: review.beforeHours,
                  beforeDay: review.beforeDay,
                  beforeWeek: review.beforeWeek,
                })}
              </Time>
            </StarsAndTime>
          </div>
        </UserInfo>
        {review.isMine && (
          <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
        )}
      </Header>
      {Array.isArray(review.image) && review.image.length === 1 ? (
        <ReviewImageContainerSingle>
          <SingleReviewImage src={review.image[0]} alt="review" />
        </ReviewImageContainerSingle>
      ) : Array.isArray(review.image) && review.image.length > 1 ? (
        <ReviewImageContainerMultiple>
          <Swiper slidesPerView={1.7} spaceBetween={6}>
            {review.image.map((image, index) => (
              <SwiperSlide key={index}>
                <MultipleReviewImage src={image} alt={`review-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ReviewImageContainerMultiple>
      ) : review.image ? (
        <ReviewImageContainerSingle>
          <SingleReviewImage src={review.image} alt="review" />
        </ReviewImageContainerSingle>
      ) : null}
      <MenuName>{review.menuName}</MenuName>
      <ReviewText>{review.content}</ReviewText>
      <Helpfulness>
        <div>{helpfulness}명에게 도움이 되었어요</div>
        <HelpfulButton
          onClick={handleHelpfulnessClick}
          $active={isHelpfulClicked}
          disabled={isHelpfulClicked}
          style={{ cursor: isHelpfulClicked ? "default" : "pointer" }}
        >
          <Icon src={isHelpfulClicked ? goodIcon : badIcon} alt="thumbs up" />
          도움이 돼요
        </HelpfulButton>
      </Helpfulness>
      {review.response && (
        <ReviewResponse>
          <ResponseHeader>
            <ResponseTitle>사장님</ResponseTitle>
            <ResponseTime>1시간 전</ResponseTime>
          </ResponseHeader>
          <ResponseText>{review.response}</ResponseText>
        </ReviewResponse>
      )}
    </ReviewContainer>
  );
};

export default ReviewItem;
