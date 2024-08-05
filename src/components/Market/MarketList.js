import styled from "styled-components";
import MarketItem from "./MarketItem";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";
import noItem from "assets/images/app-icon.png";

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
            {storeList ? (
                storeList.map((store) => (
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
                ))
            ) : (
                <NoItem>
                    <img src={noItem} alt="no-visit" width={98} height={98} />
                    <span>
                        등록된 가게가 아직 없어요
                        <br />더 나아질 시럽을 기대해주세요
                    </span>
                </NoItem>
            )}
        </Container>
    );
};

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

const Container = styled.div`
    display: flex;
    gap: 16px;
    flex-direction: column;
`;

export default MarketList;
