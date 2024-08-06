import styled from "styled-components";
import star from "assets/images/star-fill.png";
import { useNavigate } from "react-router-dom";

const HotMarket = ({ market }) => {
    const navigate = useNavigate();
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
                alt="요즘 핫한 시장"
            />
            <div className="body-info">
                <span className="body-text">{market.marketName}</span>
                <div>
                    <div className="body-content">
                        <span>
                            최근{" "}
                            {market.totalQrVisit ? market.totalQrVisit : "0"}명
                            방문
                        </span>
                    </div>
                    <span>{market.location}</span>
                </div>
            </div>
        </Wrapper>
    );
};

export default HotMarket;

const Wrapper = styled.div`
    cursor: pointer;
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
`;
