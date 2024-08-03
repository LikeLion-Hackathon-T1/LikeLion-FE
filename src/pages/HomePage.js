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
import noVisit from "assets/images/app-icon.png";

const HomePage = () => {
    const { getName } = useTokenStore();
    const syluvAxios = useSyluvAxios();
    const username = getName();
    const [allMarkets, setAllMarkets] = useState([]);
    const [latestMarkets, setLatestMarkets] = useState([]);
    const [hotMarkets, setHotMarkets] = useState([]);
    const { getAccessToken } = useTokenStore();

    useEffect(() => {
        if (getAccessToken()) {
            syluvAxios.get("/home").then((res) => {
                if (res.data) {
                    console.log(res.data.payload);
                    setLatestMarkets(res.data.payload.visitListHomeList);
                    setHotMarkets(res.data.payload.hotListHomeList);
                }
            });
        }
    }, []);

    useEffect(() => {
        syluvAxios.get("/home/search").then((res) => {
            setAllMarkets(res.data.payload);
        });
    }, []);

    return (
        <>
            <Header title="" back={false} logo={true} />
            <Wrapper>
                <Search marketList={allMarkets} />
                <NearbyMarket username={username} />
                <HotMarketList hotMarkets={hotMarkets} />
                {latestMarkets.length > 0 ? (
                    <LatestMarketList latestMarkets={latestMarkets} />
                ) : (
                    <NoItem>
                        <img
                            src={noVisit}
                            alt="no-visit"
                            width={98}
                            height={98}
                        />
                        <span>
                            방문한 시장이 아직 없어요
                            <br />
                            시장을 탐험해볼까요?
                        </span>
                    </NoItem>
                )}
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

const NoItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    gap: 16px;

    img {
        filter: grayscale(100%) brightness(110%);
    }

    span {
        text-align: center;
        line-height: 28px;

        font-size: 18px;
        font-weight: ${(props) => props.theme.fontWeight.semiBold};
        color: ${(props) => props.theme.color.gray600};
    }
`;
