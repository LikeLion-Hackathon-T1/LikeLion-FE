import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as BackIcon } from "assets/images/back.svg";
import headerImage1 from "assets/images/gimbap1.png";
import headerImage2 from "assets/images/gimbap2.png";
import headerImage3 from "assets/images/gimbap3.png";
import headerImage4 from "assets/images/gimbap4.png";
import headerImage5 from "assets/images/gimbap5.png";
import headerImage6 from "assets/images/gimbap6.png";
import headerImage7 from "assets/images/gimbap7.png";
import { ReactComponent as CallIcon } from "assets/images/call.svg";
import { ReactComponent as AddressIcon } from "assets/images/address.svg";
import { ReactComponent as TimeIcon } from "assets/images/time.svg";
import starIcon from "../../assets/images/star.png";
import emptyStarIcon from "../../assets/images/empty_star.png"; // 빈 별 아이콘 추가
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StoreInfo = ({
    call = "010-3164-1145",
    address = "서울시 마포구 연남동 255-23",
    time = "05:30 ~ 19:30 (일요일 휴무)",
    rating = 4.2, // rating 기본값 설정
}) => {
    const navigate = useNavigate();
    const images = [
        headerImage1,
        headerImage2,
        headerImage3,
        headerImage4,
        headerImage5,
        headerImage6,
        headerImage7,
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index) => setCurrentSlide(index),
    };

    // 별과 빈 별의 갯수 계산
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
        <Container>
            <ImageContainer>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <HeaderImage
                            key={index}
                            src={image}
                            alt={`Store-${index}`}
                        />
                    ))}
                </Slider>
                <BackButton onClick={() => navigate(-1)}>
                    <BackIcon />
                </BackButton>
                <ImageCounter>
                    {currentSlide + 1} / {images.length}
                </ImageCounter>
            </ImageContainer>
            <InfoContainer>
                <SubTitle>분식</SubTitle>
                <Title>원조 누드치즈김밥</Title>
                <Rating>
                    <Stars>
                        {Array(fullStars)
                            .fill()
                            .map((_, i) => (
                                <img
                                    key={`full-${i}`}
                                    src={starIcon}
                                    alt="star"
                                />
                            ))}
                        {Array(emptyStars)
                            .fill()
                            .map((_, i) => (
                                <img
                                    key={`empty-${i}`}
                                    src={emptyStarIcon}
                                    alt="empty star"
                                />
                            ))}
                    </Stars>
                    <RatingValue>{rating.toFixed(1)}</RatingValue>
                </Rating>
                <Info>
                    <CallIcon />
                    <InfoTitle>전화번호</InfoTitle>
                    <InfoDetail>{call}</InfoDetail>
                </Info>
                <Info>
                    <AddressIcon />
                    <InfoTitle>주소</InfoTitle>
                    <InfoDetail>{address}</InfoDetail>
                </Info>
                <Info>
                    <TimeIcon />
                    <InfoTitle>영업시간</InfoTitle>
                    <InfoDetail>{time}</InfoDetail>
                </Info>
            </InfoContainer>
        </Container>
    );
};

const Container = styled.div`
    padding: 0 0px;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: none;
    margin-bottom: 20px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
`;

const HeaderImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    margin: 0;
`;

const BackButton = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    cursor: pointer;
    padding: 8px;
`;

const ImageCounter = styled.div`
    position: absolute;
    bottom: 16px;
    right: 24px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px 8px;
    border-radius: 31px;
    font-size: 12px;
    width: 52px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const InfoContainer = styled.div`
    margin: 20px 20px 0 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Info = styled.div`
    display: flex;
    gap: 4px; /* 4px 간격 */
    align-items: center;
`;

const InfoTitle = styled.div`
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray800};
`;

const InfoDetail = styled.div`
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray500};
`;

const SubTitle = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray600};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Title = styled.h1`
    font-size: 20px;
    margin-top: 8px;
    margin-bottom: 12px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.gray900};
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`;

const Stars = styled.div`
    display: flex;
    align-items: center;

    & img {
        width: 14px;
        height: 14px;
        margin-right: 1px;
    }
`;

const RatingValue = styled.span`
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: 14px;
    margin-left: 4px;
`;

export default StoreInfo;
