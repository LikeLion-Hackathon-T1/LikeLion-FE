import React, { useCallback, useEffect, useState } from "react";
import Header from "components/Common/Header";
import NavBar from "components/Common/NavBar";
import MarketTab from "components/Market/MarketTab";
import VisitTab from "components/Market/VisitTab";
import { useParams } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useQuery } from "@tanstack/react-query";
import Splash from "components/Common/Splash";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";

const MarketPage = () => {
    const items = ["홈", "방문"];
    const [selectedNav, setSelectedNav] = useState(items[0]);
    const [visitList, setVisitList] = useState([]);
    const { marketId } = useParams();
    const [visitNum, setVisitNum] = useState(0);

    const syluvAxios = useSyluvAxios();
    const [marketInfo, setMarketInfo] = useState(null);
    const [marketHours, setMarketHours] = useState(null);

    const [listChanged, setListChanged] = useState(false);

    const handleVisitList = ({ changedList }) => {
        setVisitList(changedList);
    };

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const onListChange = useCallback(() => {
        setListChanged(!listChanged);
    }, [listChanged]);

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-markets-info"],
        queryFn: () => syluvAxios.get(`/market/${marketId}/info`),
    });

    useEffect(() => {
        if (data) {
            setMarketInfo(data.data.payload);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const hour = `${data.data.payload.startHour} ~ ${data.data.payload.closeHour}`;
            setMarketHours(hour);
        }
    }, [data]);

    useEffect(() => {
        syluvAxios
            .get("/market/visitlist/today")
            .then((res) => {
                if (isEmptyObject(res.data.payload)) {
                    setVisitNum(0);
                    return;
                } else {
                    const dates = Object.keys(res.data.payload);
                    const totalVisitList = res.data.payload[dates[0]];
                    const marketVisitList = totalVisitList.filter(
                        (visit) =>
                            visit.marketId.toString() === marketId.toString()
                    );
                    setVisitList(marketVisitList);
                    const num = marketVisitList.length;
                    setVisitNum(num);
                }
            })
            .catch((error) => {
                console.error(
                    "방문 리스트 불러오기 중 에러가 발생했습니다:",
                    error
                );
            });
    }, [listChanged]);

    if (isLoading) return <Splash />;

    if (isError) {
        return <ErrorPage />;
    }
    // if (isError) return <div>Error: {error.message}</div>;

    const handleNavClick = (navItem) => {
        setSelectedNav(navItem);
    };

    return (
        <Wrapper>
            <Header title={marketInfo?.name} backSrc={"/"} />
            <NavBar
                items={items}
                selected={selectedNav}
                handleSelected={handleNavClick}
                num={visitNum}
            />
            {selectedNav === "홈" ? (
                <MarketTab
                    marketId={marketId}
                    marketInfo={marketInfo}
                    marketHours={marketHours}
                    visitList={visitList}
                    onChange={onListChange}
                />
            ) : (
                <VisitTab
                    marketId={marketId}
                    visitList={visitList}
                    onChange={onListChange}
                    handleVisitList={handleVisitList}
                />
            )}
        </Wrapper>
    );
};

export default MarketPage;

const Wrapper = styled.div`
    margin-bottom: 30px;
`;
