import React, { useState, useEffect } from "react";
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
import goodIcon from "../../assets/images/good.svg";
import badIcon from "../../assets/images/bad.svg";

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
  console.log(review);

  useEffect(() => {
    setHelpfulness(Number(review.helpfulCnt));
    setIsHelpfulClicked(review.helpfulYn);
  }, [review.helpfulCnt, review.helpfulYn]);

  const handleHelpfulnessClick = async () => {
    try {
      if (isHelpfulClicked) {
        // 도움이 돼요 취소
        setIsHelpfulClicked(false);
        setHelpfulness((prevHelpfulness) => prevHelpfulness - 1);

        const response = await syluvAxios.delete(
          `/review/${review.reviewId}/like/delete`
        );

        if (response && response.data && response.data.result.code === 0) {
          onHelpful(review.reviewId);
        }
      } else {
        // 도움이 돼요 클릭
        setIsHelpfulClicked(true);
        setHelpfulness((prevHelpfulness) => prevHelpfulness + 1);

        const response = await syluvAxios.post(
          `/review/${review.reviewId}/like`
        );

        if (response && response.data && response.data.result.code === 0) {
          onHelpful(review.reviewId);
        }
      }
    } catch (error) {
      console.error("도움이 돼요 요청 중 오류 발생:", error.response);
    }
  };

  const handleDelete = async () => {
    try {
      await syluvAxios.delete(`/review/${review.reviewId}/delete`);
      onDelete(review.reviewId);
    } catch (error) {
      console.error("리뷰 삭제 중 오류 발생:", error);
    }
  };

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
      {review.image &&
        review.image.length === 1 &&
        review.image[0] !== null && (
          <ReviewImageContainerSingle>
            <SingleReviewImage src={review.image[0]} alt="review" />
          </ReviewImageContainerSingle>
        )}
      {review.image && review.image.length > 1 && (
        <ReviewImageContainerMultiple>
          <Swiper
            slidesPerView={1.7}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1.5,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 1.7,
                spaceBetween: 6,
              },
            }}
          >
            {review.image.map((image, index) => (
              <SwiperSlide key={index}>
                <MultipleReviewImage src={image} alt={`review-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ReviewImageContainerMultiple>
      )}
      <MenuName>{review.menuName}</MenuName>
      <ReviewText>{review.content}</ReviewText>
      <Helpfulness>
        <div>{helpfulness}명에게 도움이 되었어요</div>
        <HelpfulButton
          onClick={() => {
            console.log("HelpfulButton clicked");
            handleHelpfulnessClick();
          }}
          $active={isHelpfulClicked}
          style={{ cursor: "pointer" }}
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
