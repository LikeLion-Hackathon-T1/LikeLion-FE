import Header from "components/Common/Header";
import styled from "styled-components";
import add from "assets/images/add-button.png";
import { useEffect, useState } from "react";
import Button from "components/Common/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import useSyluvAxios from "hooks/useSyluvAxios";
import { ReactComponent as Star } from "assets/images/star-empty.svg";
import { ReactComponent as StarFilled } from "assets/images/star-fill.svg";

const ReviewPage = ({
    image,
    name,
    date,
    handleClick = () => {},
    handleReviewYn = () => {},
    orderId,
    menus,
}) => {
    const [review, setReview] = useState("");
    const [currentCount, setCurrentCount] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState("");
    const [photos, setPhotos] = useState([]);
    const syluvAxios = useSyluvAxios();
    const [isClicked, setIsClicked] = useState(false);

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

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos([...photos, ...files]);
    };

    const handleSubmit = () => {
        setIsClicked(true);
        const formData = new FormData();

        const dto = {
            orderId: orderId,
            rate: rating,
            content: review,
        };

        formData.append(
            "dto",
            new Blob([JSON.stringify(dto)], { type: "application/json" })
        );

        if (photos.length > 0) {
            photos.forEach((photo) => {
                formData.append("file", photo);
            });
        } else {
            formData.append("file", new Blob());
        }
        syluvAxios
            .post("review", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                handleReviewYn();
            })
            .finally(() => {
                handleClick();
            });
    };

    return (
        <Wrapper>
            <div>
                <Header title="후기 작성하기" cart={false} backSrc={-1} />
                <Menu>
                    <img src={image} alt="menu" />
                    <div className="store-info">
                        <div>
                            <span className="store-name">{name}</span>
                            <span className="menu-name">
                                {menus
                                    .map((menu) =>
                                        menu.quantity > 1
                                            ? `${menu.menuName}x${menu.quantity}`
                                            : menu.menuName
                                    )
                                    .join(", ")}
                            </span>
                        </div>
                        <span>{date}</span>
                    </div>
                </Menu>
                <Review>
                    <div className="rating-section">
                        <span className="rating-title">
                            이 가게를 추천하시겠어요?
                        </span>
                        <div className="rating-star">
                            <div className="rating-image">
                                {[...Array(5)].map((_, index) =>
                                    index < rating ? (
                                        <StarFilled
                                            cursor={"pointer"}
                                            onClick={() =>
                                                handleStarClick(index)
                                            }
                                        />
                                    ) : (
                                        <Star
                                            cursor={"pointer"}
                                            onClick={() =>
                                                handleStarClick(index)
                                            }
                                        />
                                    )
                                )}
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
                    <StyledSwiper slidesPerView={4} spaceBetween={20}>
                        <SwiperSlide>
                            <div
                                className={`photo-section ${
                                    photos.length > 0 ? "photo-added" : ""
                                }`}
                            >
                                <span>사진을 추가해주세요</span>
                                <label htmlFor="photo-upload">
                                    <img src={add} alt="add" />
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handlePhotoChange}
                                />
                            </div>
                        </SwiperSlide>
                        {photos.map((photo, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`preview-${index}`}
                                    className="preview-image"
                                />
                            </SwiperSlide>
                        ))}
                    </StyledSwiper>
                </Review>
            </div>
            <BottomBar>
                <Button
                    text="등록하기"
                    type="2"
                    onClick={() => {
                        if (!isClicked) handleSubmit();
                    }}
                />
            </BottomBar>
        </Wrapper>
    );
};

const StyledSwiper = styled(Swiper)`
    width: 99%;
`;

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
    margin-bottom: 20px;
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
        width: 394px;
        height: 154px;
        background-color: ${({ theme }) => theme.color.gray50};
        gap: 11px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.color.gray100};
        padding: 20px;

        @media (max-width: 480px) {
            width: calc(77dvw);
        }

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

    .photo-added {
        width: 104px;
        height: 104px;
        padding: 0;
        span {
            display: none;
        }
    }

    .preview-image {
        width: 104px;
        height: 104px;
        object-fit: cover;
        border-radius: 12px;
        border: 1px solid ${({ theme }) => theme.color.gray100};
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
