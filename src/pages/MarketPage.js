import React, { useEffect, useState } from "react";
import Header from "components/Common/Header";
import NavBar from "components/Common/NavBar";
import MarketTab from "components/Market/MarketTab";
import VisitTab from "components/Market/VisitTab";
import { useParams } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useQuery } from "@tanstack/react-query";

const MarketPage = () => {
    const items = ["홈", "방문"];
    const [selectedNav, setSelectedNav] = useState(items[0]);
    const { marketId } = useParams();

    const syluvAxios = useSyluvAxios();
    const [marketInfo, setMarketInfo] = useState(null);
    const [marketHours, setMarketHours] = useState(null);

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-markets"],
        queryFn: () => syluvAxios.get(`/market/info`),
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

    if (isLoading) return <div></div>;
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
            />
            {selectedNav === "홈" ? (
                <MarketTab marketInfo={marketInfo} marketHours={marketHours} />
            ) : (
                <VisitTab marketId={marketId} />
            )}
        </>
    );
};

export default MarketPage;
