import React, { useState } from "react";
import styled from "styled-components";
import starIcon from "../../assets/images/star.png";
import goodIcon from "../../assets/images/good.png";

const ReviewContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    font-weight: bold;
`;

const StarsAndTime = styled.div`
    display: flex;
    align-items: center;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;
    margin-right: 5px; /* Stars와 Time 사이에 약간의 여백 추가 */
`;

const Star = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 2px;
`;

const Time = styled.div`
    color: #888;
    font-size: 0.8em;
`;

const DeleteButton = styled.button`
    border: none;
    background-color: transparent;
    color: #9a9a9a;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.8em;
`;

const ReviewImage = styled.img`
    width: 100%;
    height: auto;
    margin: 10px 0;
    border-radius: 8px;
`;

const ReviewText = styled.p`
    margin: 10px 0;
`;

const Helpfulness = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    color: #888;
`;

const HelpfulButton = styled.button`
    background: none;
    border: 1px solid #ff6b00;
    border-radius: 20px;
    color: #ff6b00;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 5px;
`;

const ReviewResponse = styled.div`
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
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
                                    <Star
                                        key={index}
                                        src={starIcon}
                                        alt="star"
                                    />
                                ))}
                                <span>{review.rating}</span>
                            </Stars>
                            <Time>{review.time} 전</Time>
                        </StarsAndTime>
                    </div>
                </UserInfo>
                <DeleteButton>삭제하기</DeleteButton>
            </Header>
            <ReviewImage src={review.image} alt="review" />
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
                    <strong>사장님</strong> {review.response}
                </ReviewResponse>
            )}
        </ReviewContainer>
    );
};

export default ReviewItem;
