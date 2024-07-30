import styled from "styled-components";
import { ReactComponent as Location } from "assets/images/location.svg";
import { useNavigate } from "react-router-dom";

const NearbyMarket = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <span className="title">
                김강민님과
                <br />
                지금 가까운 시장은?
            </span>
            <div className="location" onClick={() => navigate("/market/1")}>
                <Location />
                <span>광장시장</span>
            </div>
        </Container>
    );
};

export default NearbyMarket;

const Container = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    .title {
        font-size: 24px;
        font-weight: ${(props) => props.theme.fontWeight.semiBold};
        color: ${(props) => props.theme.color.gray900};
        line-height: 36px;
    }

    .location {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;

        span {
            font-size: 20px;
            font-weight: ${(props) => props.theme.fontWeight.bold};
            color: ${(props) => props.theme.color.primary};
        }
    }
`;
