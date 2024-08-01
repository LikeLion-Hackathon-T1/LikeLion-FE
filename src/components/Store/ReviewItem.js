import React, { useState, useCallback } from "react";
import styled from "styled-components";
import useSyluvAxios from "../../hooks/useSyluvAxios"; // syluvAxios를 임포트합니다
import goodIcon from "../../assets/images/good.png";
import badIcon from "../../assets/images/bad.png";

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

const ReviewContainer = styled.div`
  margin-bottom: 44px;
  &:first-child {
    margin-top: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 14px;
`;

const StarsAndTime = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const Star = styled.span`
  font-size: 14px; /* 별의 크기 */
  color: ${({ filled }) => (filled === "true" ? "gold" : "#CCCCCC")};
  margin-top: 4px;
  gap: 1px;
`;

const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray400};
  font-size: 12px;
  margin-top: 4px;
  margin-right: 4px; /* Time과 DeleteButton 간격 설정 */
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  outline: none;
  color: ${({ theme }) => theme.color.gray400};
  margin-left: auto; /* DeleteButton을 오른쪽 끝으로 이동 */
  margin-right: 0px; /* 화면 오른쪽에서 20px 여백 */
  margin-top: 16px;
`;

const ReviewImageContainerSingle = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 19px;
  aspect-ratio: 1.6 / 1;
`;

const ReviewImageContainerMultiple = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow-x: auto;
  display: flex;
  margin-top: 19px;
  padding-right: 20px;
  gap: 6px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SingleReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const MultipleReviewImage = styled.img`
  width: 250px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  flex: 0 0 auto;
`;

const MenuName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray300};
  margin-top: 19px;
`;

const ReviewText = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray800};
  margin-bottom: 6px;
`;

const Helpfulness = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 14px;
  margin-top: 10px;
  height: 24px;
`;

const HelpfulButton = styled.button`
  background: none;
  border: 1px solid
    ${({ active }) => (active === "true" ? "#ff6b00" : "#9A9A9A")};
  border-radius: 54px;
  color: ${({ active }) => (active === "true" ? "#ff6b00" : "#9A9A9A")};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  left: 0px;
  outline: none;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
`;

const ReviewResponse = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #fafafa;
  border-radius: 8px;
`;

const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ResponseTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  margin-right: 4px;
  font-size: 14px;
`;

const ResponseTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray400};
`;

const ResponseText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray800};
`;

const ReviewItem = ({ review, onDelete }) => {
  const [helpfulness, setHelpfulness] = useState(review.likeCount);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(
    review.isHelpfulClicked || false
  );

  const syluvAxios = useSyluvAxios(); // useSyluvAxios 훅을 사용하여 syluvAxios 인스턴스를 가져옵니다

  const formattedTime = formatTime({
    beforeHours: review.beforeHours,
    beforeDay: review.beforeDay,
    beforeWeek: review.beforeWeek,
  });

  const handleHelpfulnessClick = async () => {
    if (!isHelpfulClicked && !review.isMine) {
      console.log("Attempting to like the review...");
      try {
        const response = await syluvAxios.post(
          `/review/${review.reviewId}/like`
        );
        const result = response.data;
        console.log("API response:", result);
        if (result.result.code === 0) {
          setHelpfulness(
            (prevHelpfulness) => parseInt(prevHelpfulness, 10) + 1
          );
          setIsHelpfulClicked(true);
        }
      } catch (error) {
        console.error("Error liking the review:", error);
      }
    }
  };

  const handleDelete = useCallback(() => {
    syluvAxios
      .delete(`/review/${review.reviewId}/delete`)
      .then((response) => {
        const result = response.data;
        if (result.result.code === 0) {
          console.log("리뷰가 정상적으로 삭제되었습니다:", result.payload);
          onDelete(review.reviewId);
        } else {
          console.error("리뷰 삭제 중 오류 발생:", result);
        }
      })
      .catch((error) => {
        console.error("리뷰 삭제 중 오류 발생:", error);
      });
  }, [review.reviewId, onDelete]);
  return (
    <ReviewContainer>
      <Header>
        <UserInfo>
          <UserProfileImage src={review.picture} alt="User Profile" />
          <div>
            <UserName>{review.name}</UserName>
            <StarsAndTime>
              <StarContainer>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} filled={(index < review.rating).toString()}>
                    ★
                  </Star>
                ))}
              </StarContainer>
              <Time>{formattedTime}</Time>
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
          {review.image.map((image, index) => (
            <MultipleReviewImage
              key={index}
              src={image}
              alt={`review-${index}`}
            />
          ))}
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
          active={isHelpfulClicked.toString()}
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
