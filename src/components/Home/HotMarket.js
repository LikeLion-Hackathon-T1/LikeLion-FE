import styled from "styled-components";
import star from "assets/images/star-fill.png";

const HotMarket = () => {
    return (
        <Wrapper className="body">
            <img
                className="market-image"
                src="https://via.placeholder.com/150"
                alt="최근 방문한 시장"
            />
            <div className="body-info">
                <span className="body-text">광장시장</span>
                <div>
                    <div className="body-content">
                        <img src={star} alt="rating" width="14px" />
                        <div>4.2</div>
                        <span>최근 300명 방문</span>
                    </div>
                    <span>서울시 종로구 창경궁로 88</span>
                </div>
            </div>
        </Wrapper>
    );
};

export default HotMarket;

const Wrapper = styled.div`
    .market-image {
        width: 218px;
        height: 162px;
        border-radius: 12px;
        margin-bottom: 12px;
    }
    .body-info {
        display: flex;
        flex-direction: column;
        gap: 8px;

        font-size: 14px;
        font-weight: ${(props) => props.theme.fontWeight.regular};
        color: ${(props) => props.theme.color.gray500};
    }
    .body-text {
        font-size: 16px;
        font-weight: ${(props) => props.theme.fontWeight.semiBold};
        color: ${(props) => props.theme.color.gray900};
    }
    .body-content {
        display: flex;
        div {
            margin-left: 2px;
            margin-right: 10px;
            font-size: 14px;
            font-weight: ${(props) => props.theme.fontWeight.semiBold};
            color: ${(props) => props.theme.color.gray900};
        }
        margin-bottom: 10px;
    }
`;
