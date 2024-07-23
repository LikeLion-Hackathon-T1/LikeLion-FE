import React, { useState } from "react";
import styled from "styled-components";
import starIcon from "../../assets/images/star.png";
import goodIcon from "../../assets/images/good.png";

const ReviewContainer = styled.div`
  margin-bottom: 44px; // 각 리뷰 항목 사이의 간격을 44px로 설정
  &:first-child {
    margin-top: 0; // 첫 번째 리뷰의 상단 여백 제거
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

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 14px;
`;

const StarsAndTime = styled.div`
  display: flex;
  align-items: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

const Star = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 1.33px;
`;

const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray400};
  font-size: 12px;
`;

const ReviewImageContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 10px;
`;

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 8px;
  object-fit: cover;
`;

const MenuName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray300};
  margin-top: 19px;
`;

const ReviewText = styled.p`
  margin-top: 6px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray800};
`;

const Helpfulness = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 14px;
  margin-top: 10px;
`;

const HelpfulButton = styled.button`
  background: none;
  border: 1px solid #ff6b00;
  border-radius: 54px;
  color: #ff6b00;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  left: -20px; // "도움이 돼요" 버튼을 화면 왼쪽으로 20px 이동
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
`;

const ReviewResponse = styled.div`
  padding: 20px;
  margin-top: 20px;
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

const ReviewItem = ({ review }) => {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);

  const handleHelpfulnessClick = () => {
    setHelpfulness(helpfulness + 1);
  };

  return (
    <ReviewContainer>
      <Header>
        <UserInfo>
          <UserProfile />
          <div>
            <UserName>{review.reviewer}</UserName>
            <StarsAndTime>
              <Stars>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} src={starIcon} alt="star" />
                ))}
              </Stars>
              <Time>{review.time} 전</Time>
            </StarsAndTime>
          </div>
        </UserInfo>
      </Header>
      <ReviewImageContainer>
        {review.images.map((image, index) => (
          <ReviewImage key={index} src={image} alt={`review-${index}`} />
        ))}
      </ReviewImageContainer>
      <MenuName>{review.menu}</MenuName>
      <ReviewText>{review.comment}</ReviewText>
      <Helpfulness>
        <div>{helpfulness}명에게 도움이 되었습니다</div>
        <HelpfulButton onClick={handleHelpfulnessClick}>
          <Icon src={goodIcon} alt="thumbs up" />
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
