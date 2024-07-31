import styled from "styled-components";
import MarketItem from "./MarketItem";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const MarketList = ({
    searchInfo,
    marketId = 0,
    visitList,
    onChange = () => {},
}) => {
    const syluvAxios = useSyluvAxios();
    const [storeList, setStoreList] = useState(null);

    let fetchData;

    fetchData = async () => {
        try {
            const response = await syluvAxios.get("/market/store", {
                params: {
                    search: searchInfo.search,
                    category: searchInfo.category,
                },
            });
            setStoreList(response.data.payload);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchInfo]);

    return (
        <Container>
            {storeList?.map((store) => (
                <MarketItem
                    key={store.storeId}
                    storeId={store.storeId}
                    marketId={marketId}
                    type={store.category}
                    name={store.name}
                    desc={store.description}
                    imgSrc={store.image}
                    visitList={visitList}
                    onChange={onChange}
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
