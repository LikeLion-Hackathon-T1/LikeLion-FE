import Header from "components/Common/Header";
import NoItem from "components/Common/NoItem";
import TabBar from "components/Common/TabBar";
import TotalVisitList from "components/Visit/TotalVisitList";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const VisitListPage = () => {
    const syluvAxios = useSyluvAxios();
    const [visitList, setVisitList] = useState({});

    useEffect(() => {
        const getVisitList = async () => {
            try {
                const res = await syluvAxios.get("market/visitlist");
                setVisitList(res.data.payload);
            } catch (error) {
                console.error(error);
            }
        };
        getVisitList();
    }, []);

    const totalLength = useCallback(() => {
        return Object.keys(visitList).reduce((acc, date) => {
            return acc + visitList[date].length;
        }, 0);
    }, [visitList]);

    return (
        <>
            <Header title="방문 리스트" back={false} />
            {totalLength() > 0 ? (
                <Wrapper>
                    {Object.keys(visitList).map((date, index) => (
                        <TotalVisitList
                            key={visitList[date][0].visitListId}
                            date={date}
                            visitList={visitList[date]}
                        />
                    ))}
                </Wrapper>
            ) : (
                <ItemContainer>
                    <NoItem />
                </ItemContainer>
            )}
            <TabBar activeTab={"visit"} />
        </>
    );
};

export default VisitListPage;

const ItemContainer = styled.div`
    margin-top: 100px;
`;

const Wrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;
`;
