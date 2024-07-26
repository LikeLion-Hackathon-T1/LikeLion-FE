import Header from "components/Common/Header";
import styled from "styled-components";
import star from "assets/images/star-empty.png";
import starFilled from "assets/images/star-fill.png";
import add from "assets/images/add-button.png";

const ReviewPage = () => {
    return (
        <>
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
                            <img src={starFilled} alt="star" />
                            <img src={starFilled} alt="star" />
                            <img src={starFilled} alt="star" />
                            <img src={starFilled} alt="star" />
                            <img src={starFilled} alt="star" />
                        </div>
                        <span>최고의 가게, 추천합니다</span>
                    </div>
                </div>
                <div className="review-section">
                    <span>음식의 맛, 양 포장 상태 등</span>
                </div>
                <div className="photo-section">
                    <span>사진을 추가해주세요</span>
                    <img src={add} alt="review" />
                </div>
            </Review>
        </>
    );
};

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

        .rating-star {
            display: flex;
            gap: 2px;
        }

        span {
            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.primary};
            margin-bottom: 32px;
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
