import { useEffect, useState } from "react";
import styled from "styled-components";

const VisitItem = ({ item }) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (item.state === "준비완료") {
            setIsReady(true);
        }
    }, [item.state]);

    return (
        <ListItem>
            <div>
                <Number>{item.order}</Number>
                <MarketName>{item.name}</MarketName>
            </div>
            <ItemState isReady={isReady}>{item.state}</ItemState>
        </ListItem>
    );
};

export default VisitItem;

const Number = styled.span`
    font-size: 18px;
    font-weight: bold;
    background-color: pink;
    color: white;
    padding: 2% 8px;
    border-radius: 20px;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const MarketName = styled.span`
    margin-left: 8px;
    font-size: 18px;
    font-weight: bold;
`;

const ItemState = styled.span`
    font-size: 12px;
    color: ${(props) => (props.isReady === true ? "green" : "gray")};
`;
