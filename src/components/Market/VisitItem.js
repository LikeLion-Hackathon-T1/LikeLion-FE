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
            <LeftContainer>
                <NumberCircle>
                    <Number>{item.order}</Number>
                </NumberCircle>
                <MarketName>{item.name}</MarketName>
            </LeftContainer>
            <ItemState isReady={isReady}>{item.state}</ItemState>
        </ListItem>
    );
};

export default VisitItem;

const Number = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: white;
`;

const NumberCircle = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: pink;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
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
