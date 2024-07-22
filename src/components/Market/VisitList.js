import styled from "styled-components";
import VisitItem from "./VisitItem";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useSyluvAxios from "hooks/useSyluvAxios";

const VisitList = () => {
    const syluvAxios = useSyluvAxios();
    const [newvisitList, setVisitList] = useState(null);
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ["get-visitList"],
        queryFn: () => syluvAxios.get("/market/visitlist"),
    });

    useEffect(() => {
        if (data) {
            setVisitList(data.data.payload);
        }
    }, [data]);

    if (isLoading) return <div></div>;
    if (isError) return <div>Error: {error.message}</div>;

    const visitList = [
        {
            order: 1,
            name: "꽃분이네",
            state: "메뉴 준비 중",
        },
        {
            order: 2,
            name: "주막파전",
            state: "준비완료",
        },
        {
            order: 3,
            name: "세미수산",
            state: "방문 전",
        },
        {
            order: 4,
            name: "빈대떡집",
            state: "방문 전",
        },
    ];
    return (
        <ListContainer>
            <ListTitle>정윤석님의 방문 리스트</ListTitle>
            <List>
                {visitList.map((item) => (
                    <VisitItem key={item.name} item={item} />
                ))}
            </List>
        </ListContainer>
    );
};

export default VisitList;

const ListContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
`;

const List = styled.div`
    padding-top: 10px;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const ListTitle = styled.h2`
    margin: 16px 0;
    font-size: 24px;
    font-weight: bold;
`;
