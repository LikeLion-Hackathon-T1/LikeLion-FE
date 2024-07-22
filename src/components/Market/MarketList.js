import styled from "styled-components";
import MarketItem from "./MarketItem";

const markets = [
    {
        id: 1,
        type: "분식",
        name: "원조 누드 치즈김밥",
        desc: "매콤한 양념과 부드러운 치즈가 만나 더욱 맛있는 치즈김밥",
        imgSrc: "https://via.placeholder.com/104",
    },
    {
        id: 2,
        type: "중식",
        name: "태화루",
        desc: "중국의 전통적인 맛을 그대로 선보이는 태화루",
        imgSrc: "https://via.placeholder.com/104",
    },
];

const MarketList = () => {
    return (
        <Container>
            {markets.map((market) => (
                <MarketItem
                    key={market.id}
                    type={market.type}
                    name={market.name}
                    desc={market.desc}
                    imgSrc={market.imgSrc}
                />
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;
`;

export default MarketList;
