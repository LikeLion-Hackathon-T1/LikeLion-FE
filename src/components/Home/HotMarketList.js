import styled from "styled-components";
import HotMarket from "./HotMarket";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const HotMarketList = ({ hotMarkets }) => {
    return (
        <MarketWrapper>
            <span className="text-title  mt">요즘 핫한 시장</span>
            <StyledSwiper slidesPerView={2} spaceBetween={20}>
                {hotMarkets.map((market, index) => (
                    <SwiperSlide key={index}>
                        <HotMarket market={market} />
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </MarketWrapper>
    );
};

export default HotMarketList;

const MarketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
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
`;

const StyledSwiper = styled(Swiper)`
    width: 480px;
`;
