import star from "assets/images/star-fill.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LatestMarket = ({ market }) => {
    const navigate = useNavigate();
    const dateConvert = (date) => {
        //2024-07-28 => 2024.07.28
        const dateArr = date.split("-");
        return `${dateArr[0]}.${dateArr[1]}.${dateArr[2]}`;
    };
    return (
        <Wrapper
            className="body"
            onClick={() => {
                navigate(`/market/${market.marketId}`);
            }}
        >
            <img
                className="market-image"
                src={market.marketImage}
                alt="최근 방문한 시장"
            />
            <div className="body-info">
                <span className="body-text">{market.marketName}</span>
                <div>
                    <div className="body-content">
                        <span>{dateConvert(market.visitDate)} 방문</span>
                    </div>
                    <span>{market.location}</span>
                </div>
            </div>
        </Wrapper>
    );
};

export default LatestMarket;

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
            font-weight: ${(props) => props.theme.fontWeight.regular};
            color: ${(props) => props.theme.color.gray900};
        }
        margin-bottom: 10px;
    }
    cursor: pointer;
`;
