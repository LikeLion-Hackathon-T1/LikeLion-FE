import styled from "styled-components";
import LatestMarket from "./LatestMarket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const LatestMarketList = ({ latestMarkets }) => {
    console.log(latestMarkets);
    return (
        <MarketWrapper>
            <span className="text-title">최근 방문한 시장</span>
            <StyledSwiper slidesPerView={2} spaceBetween={20}>
                {latestMarkets.map((market, index) => (
                    <SwiperSlide key={index}>
                        <LatestMarket market={market} />
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </MarketWrapper>
    );
};

export default LatestMarketList;

const MarketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 44px;
    gap: 20px;
    width: 100%;

    .mt {
        margin-top: 12px;
    }

    .text-title {
        font-size: 20px;
        font-weight: ${(props) => props.theme.fontWeight.semiBold};
        color: ${(props) => props.theme.color.gray900};
    }

    .list {
        display: flex;
        gap: 12px;

        overflow-x: auto;
    }
`;

const StyledSwiper = styled(Swiper)`
    width: 480px;
`;
