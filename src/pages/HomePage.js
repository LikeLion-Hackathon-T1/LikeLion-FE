import React, { useCallback, useEffect, useState } from "react";
import Header from "components/Common/Header";
import styled from "styled-components";
import NearbyMarket from "components/Home/NearbyMarket";
import TabBar from "components/Common/TabBar";
import useSyluvAxios from "hooks/useSyluvAxios";
import HotMarketList from "components/Home/HotMarketList";
import LatestMarketList from "components/Home/LatestMarketList";
import Search from "components/Common/Search";

const HomePage = () => {
    const syluvAxios = useSyluvAxios();

    const [latestMarkets, setLatestMarkets] = useState([]);
    const [hotMarkets, setHotMarkets] = useState([]);

    useEffect(() => {
        syluvAxios.get("/home/search").then((res) => {
            console.log(res);
        });
    }, []);

    useEffect(() => {
        syluvAxios.get("/home").then((res) => {
            setLatestMarkets(res.data.payload.visitListHomeList);
            setHotMarkets(res.data.payload.hotListHomeList);
        });
    }, []);

    return (
        <>
            <Header title="" back={false} logo={true} />
            <Wrapper>
                <Search />
                <NearbyMarket />
                <LatestMarketList latestMarkets={latestMarkets} />
                <HotMarketList hotMarkets={hotMarkets} />
            </Wrapper>
            <TabBar />
        </>
    );
};

export default HomePage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 0 20px;
`;
