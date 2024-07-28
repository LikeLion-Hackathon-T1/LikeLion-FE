import Header from "components/Common/Header";
import styled from "styled-components";
import star from "assets/images/star-empty.png";
import starFilled from "assets/images/star-fill.png";
import add from "assets/images/add-button.png";
import { useEffect, useState } from "react";
import Button from "components/Common/Button";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
    const [review, setReview] = useState("");
    const [currentCount, setCurrentCount] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState("");
    const { orderId } = useParams();

    useEffect(() => {
        setCurrentCount(review.length);
    }, [review]);

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    useEffect(() => {
        const ratingTexts = [
            "가게를 평가해주세요",
            "다시 오고 싶지 않아요",
            "생각보다 별로에요",
            "괜찮네요",
            "또 오고 싶어요",
            "최고의 가게, 추천합니다!",
        ];
        setRatingText(ratingTexts[rating]);
    }, [rating]);

    return (
        <Wrapper>
            <div>
                <Header title="후기 작성하기" cart={false} />
                <Menu>
                    <img src="https://via.placeholder.com/375x375" alt="menu" />
                    <div className="store-info">
                        <div>
                            <span className="store-name">진아 수산</span>
                            <span className="menu-name">연어 회</span>
                        </div>
                        <span>2024년 7월 17일 오후 08:12</span>
                    </div>
                </Menu>
                <Review>
                    <div className="rating-section">
                        <span className="rating-title">
                            이 가게를 추천하시겠어요?
                        </span>
                        <div className="rating-star">
                            <div className="rating-image">
                                {[...Array(5)].map((_, index) => (
                                    <img
                                        key={index}
                                        src={index < rating ? starFilled : star}
                                        alt="star"
                                        onClick={() => handleStarClick(index)}
                                    />
                                ))}
                            </div>
                            <span>{ratingText}</span>
                        </div>
                    </div>
                    <div className="review-section">
                        <textarea
                            className="review-input"
                            type="text"
                            placeholder="가게와 상품에 대한 솔직한 리뷰를 남겨주세요."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <div className="review-count">
                            <span className="current-count">
                                {currentCount}
                            </span>
                            /300
                        </div>
                    </div>
                    <div className="photo-section">
                        <span>사진을 추가해주세요</span>
                        <img src={add} alt="review" />
                    </div>
                </Review>
            </div>
            <BottomBar>
                <Button text="등록하기" type="2" />
            </BottomBar>
        </Wrapper>
    );
};

const BottomBar = styled.div`
    padding: 0 20px 25px 20px;
`;

const Wrapper = styled.div`
    position: relative;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Review = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;

    .rating-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        .rating-title {
            font-size: 18px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.gray900};
        }
    }

    .rating-star {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;

        .rating-image {
            display: flex;
            gap: 2px;

            img {
                &:hover {
                    cursor: pointer;
                }
            }
        }

        span {
            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.primary};
            margin-bottom: 32px;
        }
    }

    .review-section {
        width: 100%;
        display: flex;
        position: relative;
        .review-input {
            width: 100%;
            height: 184px;
            border: 1px solid ${({ theme }) => theme.color.gray100};
            border-radius: 12px;
            padding: 16px;
            resize: none;
            outline: none;
            font-size: 14px;
            font-weight: ${({ theme }) => theme.fontWeight.regular};
            color: ${({ theme }) => theme.color.gray900};
            &::placeholder {
                color: ${({ theme }) => theme.color.gray300};
            }
            margin-bottom: 20px;
        }
        .review-count {
            position: absolute;
            bottom: 40px;
            right: 20px;
            display: flex;
            font-size: 14px;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            color: ${({ theme }) => theme.color.gray300};

            .current-count {
                color: ${({ theme }) => theme.color.primary};
            }
        }
    }

    .photo-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 154px;
        background-color: ${({ theme }) => theme.color.gray50};
        gap: 11px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray100};

        span {
            font-size: 18px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.gray900};
        }

        img {
            &:hover {
                cursor: pointer;
                transform: scale(1.08);
                transition: transform 0.1s;
            }
        }
    }
`;

const Menu = styled.div`
    display: flex;
    gap: 12px;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray300};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
    padding: 21.5px 20px 24px 20px;
    margin-bottom: 32px;

    img {
        width: 70px;
        height: 70px;
        border-radius: 12px;
    }

    .store-name {
        color: ${({ theme }) => theme.color.gray800};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }

    .menu-name {
        color: ${({ theme }) => theme.color.gray400};
    }

    .store-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
    }
`;

export default ReviewPage;
