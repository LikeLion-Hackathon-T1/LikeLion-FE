import React, { useCallback, useEffect, useState } from "react";
import Header from "components/Common/Header";
import styled from "styled-components";
import NearbyMarket from "components/Home/NearbyMarket";
import TabBar from "components/Common/TabBar";
import useSyluvAxios from "hooks/useSyluvAxios";
import HotMarketList from "components/Home/HotMarketList";
import LatestMarketList from "components/Home/LatestMarketList";
import Search from "components/Common/Search";
import useTokenStore from "hooks/useTokenStore";

const HomePage = () => {
    const { getName } = useTokenStore();
    const syluvAxios = useSyluvAxios();
    const username = getName();
    const [allMarkets, setAllMarkets] = useState([]);
    const [latestMarkets, setLatestMarkets] = useState([]);
    const [hotMarkets, setHotMarkets] = useState([]);

    useEffect(() => {
        syluvAxios.get("/home").then((res) => {
            if (res) {
                setLatestMarkets(res.data?.payload.visitListHomeList);
                setHotMarkets(res.data?.payload.hotListHomeList);
                console.log(res.data.payload);
            }
        });
    }, []);

    useEffect(() => {
        syluvAxios.get("/home/search").then((res) => {
            setAllMarkets(res.data.payload);
            console.log(res.data.payload);
        });
    }, []);

    return (
        <>
            <Header title="" back={false} logo={true} />
            <Wrapper>
                <Search marketList={allMarkets} />
                <NearbyMarket username={username} />
                {latestMarkets.length > 0 && (
                    <LatestMarketList latestMarkets={latestMarkets} />
                )}
                <HotMarketList hotMarkets={hotMarkets} />
            </Wrapper>
            <TabBar activeTab={""} />
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
