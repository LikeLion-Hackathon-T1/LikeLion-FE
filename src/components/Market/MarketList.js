import styled from "styled-components";
import MarketItem from "./MarketItem";

const MarketList = () => {
    const markets = [
        { id: 1, name: "꽃분이네", desc: "꽃분이네 입니다.", imgSrc: "" },
        { id: 2, name: "윤석이네", desc: "윤석이네 입니다.", imgSrc: "" },
        { id: 3, name: "꽃분이네", desc: "꽃분이네 입니다.", imgSrc: "" },
        { id: 4, name: "윤석이네", desc: "윤석이네 입니다.", imgSrc: "" },
        { id: 5, name: "꽃분이네", desc: "꽃분이네 입니다.", imgSrc: "" },
        { id: 6, name: "윤석이네", desc: "윤석이네 입니다.", imgSrc: "" },
        { id: 7, name: "꽃분이네", desc: "꽃분이네 입니다.", imgSrc: "" },
        { id: 8, name: "윤석이네", desc: "윤석이네 입니다.", imgSrc: "" },
        { id: 9, name: "꽃분이네", desc: "꽃분이네 입니다.", imgSrc: "" },
        { id: 10, name: "윤석이네", desc: "윤석이네 입니다.", imgSrc: "" },
    ];
    return (
        <Container>
            {markets.map((market) => (
                <MarketItem
                    key={market.id}
                    name={market.name}
                    desc={market.desc}
                    imgSrc={
                        market.imgSrc.length > 0
                            ? market.imgSrc
                            : "https://via.placeholder.com/100"
                    }
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;
    overflow-y: scroll;
    max-height: 450px;

    // 스크롤바를 숨기는 스타일
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox
`;

export default MarketList;
