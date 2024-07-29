import React, { useEffect, useState } from "react";
import Header from "components/Common/Header";
import NavBar from "components/Common/NavBar";
import MarketTab from "components/Market/MarketTab";
import VisitTab from "components/Market/VisitTab";
import { useParams } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useQuery } from "@tanstack/react-query";
import Splash from "components/Common/Splash";

const MarketPage = () => {
    const items = ["홈", "방문"];
    const [selectedNav, setSelectedNav] = useState(items[0]);
    const [visitList, setVisitList] = useState(null);
    const { marketId } = useParams();
    const [visitNum, setVisitNum] = useState(0);

    const syluvAxios = useSyluvAxios();
    const [marketInfo, setMarketInfo] = useState(null);
    const [marketHours, setMarketHours] = useState(null);

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-markets"],
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
            .get("/market/visitlist")
            .then((res) => {
                setVisitList(res.data.payload);
                const num = res.data.payload.length;
                setVisitNum(num);
            })
            .catch((error) => {
                console.error(
                    "방문 리스트 불러오기 중 에러가 발생했습니다:",
                    error
                );
            });
    }, []);

    if (isLoading) return <Splash />;
    if (isError) return <div>Error: {error.message}</div>;

    const handleNavClick = (navItem) => {
        setSelectedNav(navItem);
    };
    return (
        <>
            <Header title={marketInfo?.name} />
            <NavBar
                items={items}
                selected={selectedNav}
                handleSelected={handleNavClick}
                num={visitNum}
            />
            {selectedNav === "홈" ? (
                <MarketTab
                    marketInfo={marketInfo}
                    marketHours={marketHours}
                    visitList={visitList}
                />
            ) : (
                <VisitTab marketId={marketId} visitList={visitList} />
            )}
        </>
    );
};

export default MarketPage;
