import styled from "styled-components";
import { ReactComponent as Location } from "assets/images/location.svg";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useCallback, useEffect, useState } from "react";
import { useGeoLocation } from "hooks/useGeoLocation";
import Splash from "components/Common/Splash";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000 * 3600 * 24,
};

const NearbyMarket = ({ username }) => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const { location, error } = useGeoLocation(geolocationOptions);
    const [nearMarket, setNearMarket] = useState("");

    const getLocation = useCallback(() => {
        syluvAxios
            .get("/home/nearmarket", {
                params: {
                    xloc: location.latitude,
                    yloc: location.longitude,
                },
            })
            .then((res) => {
                setNearMarket(res.data.payload);
            });
    }, [location, syluvAxios]);

    useEffect(() => {
        if (location) {
            getLocation();
        }
    }, [location]);

    if (nearMarket === "") {
        return <Splash />;
    }

    return (
        <Container>
            <span className="title">
                {username ? username : "시럽"}님과
                <br />
                지금 가까운 시장은?
            </span>
            <div
                className="location"
                onClick={() => navigate(`/market/${nearMarket?.marketId}`)}
            >
                <Location />
                <span>{nearMarket.marketName}</span>
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
            cursor: pointer;
        }
    }
`;
