import Header from "components/Common/Header";
import styled from "styled-components";
import add from "assets/images/add-button.png";
import { useEffect, useState } from "react";
import Button from "components/Common/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import ButtonModal from "components/Common/ButtonModal";
import { useNavigate } from "react-router-dom";

const FeedBack = () => {
    const [review, setReview] = useState("");
    const [currentCount, setCurrentCount] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos([...photos, ...files]);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    useEffect(() => {
        setCurrentCount(review.length);
    }, [review]);

    return (
        <>
            {isSubmitted && (
                <ButtonModal
                    title="피드백이 제출되었습니다"
                    subText="좋은 서비스를 위해 노력하겠습니다"
                    right="홈으로"
                    onRightClick={() => navigate("/", { replace: true })}
                />
            )}
            <Wrapper>
                <div>
                    <Header
                        title="피드백 작성하기"
                        cart={false}
                        backSrc={"/"}
                    />
                    <Review>
                        <div className="review-section">
                            <textarea
                                className="review-input"
                                type="text"
                                placeholder="시럽 페이지를 이용하는 데 발생한 문제를 자세하게 알려주세요.  더 나은 서비스를 위해 노력하겠습니다."
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
                        text="제출하기"
                        type="2"
                        onClick={() => handleSubmit()}
                    />
                </BottomBar>
            </Wrapper>
        </>
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

export default FeedBack;
