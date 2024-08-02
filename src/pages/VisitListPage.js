import Header from "components/Common/Header";
import TabBar from "components/Common/TabBar";
import TotalVisitList from "components/Visit/TotalVisitList";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";
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

    return (
        <>
            <Header title="방문 리스트" back={false} />
            <Wrapper>
                {Object.keys(visitList).map((date) => (
                    <TotalVisitList
                        key={date}
                        date={date}
                        visitList={visitList[date]}
                    />
                ))}
            </Wrapper>
            <TabBar activeTab={"visit"} />
        </>
    );
};

export default VisitListPage;

const Wrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;
`;
