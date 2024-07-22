import styled from "styled-components";
import MarketItem from "./MarketItem";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const MarketList = ({ searchInfo }) => {
    const syluvAxios = useSyluvAxios();
    const [storeList, setStoreList] = useState(null);

    let fetchData;

    if (searchInfo.search === "" && searchInfo.category === "") {
        fetchData = async () => {
            try {
                const response = await syluvAxios.get("/store/info");
                setStoreList(response.data.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    } else {
        fetchData = async () => {
            try {
                const response = await syluvAxios.get("/market/store", {
                    params: {
                        search: searchInfo.search,
                        category: searchInfo.category,
                    },
                });
                setStoreList(response.data.payload);
                console.log(response.data.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    }

    useEffect(() => {
        fetchData();
    }, [searchInfo]);

    console.log(storeList);

    return (
        <Container>
            {storeList?.map((store) => (
                <MarketItem
                    key={store.storeId}
                    storeId={store.storeId}
                    type={store.type}
                    name={store.name}
                    desc={store.desc}
                    imgSrc={store.storeImage}
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
