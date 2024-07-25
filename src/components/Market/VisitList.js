import styled from "styled-components";
import VisitItem from "./VisitItem";
import { useEffect, useState } from "react";
import useSyluvAxios from "hooks/useSyluvAxios";

const VisitList = () => {
    const syluvAxios = useSyluvAxios();
    const [newvisitList, setVisitList] = useState(null);

    useEffect(() => {
        syluvAxios
            .get("/market/visitlist")
            .then((res) => {
                setVisitList(res.data.payload);
            })
            .catch((error) => {
                console.error(
                    "방문 리스트 불러오기 중 에러가 발생했습니다:",
                    error
                );
            });
    }, []);

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
