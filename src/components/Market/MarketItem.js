import styled from "styled-components";
import { ReactComponent as VisitIcon } from "assets/images/visit.svg";
import { useState } from "react";
import MarketInfoSmall from "./MarketinfoSmall";

const MarketItem = ({
    type = "전체",
    name = "가게 이름",
    desc = "설명이 없습니다.",
    imgSrc = "https://via.placeholder.com/150",
}) => {
    const [selected, setIsSelected] = useState(false);
    const handleVisit = () => {
        setIsSelected(!selected);
    };

    return (
        <MarketContainer>
            <MarketInfoSmall
                imgSrc={imgSrc}
                type={type}
                name={name}
                desc={desc}
            />
            <VisitButton onClick={() => handleVisit()} selected={selected} />
        </MarketContainer>
    );
};

export default MarketItem;

const MarketContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const VisitButton = styled(VisitIcon)`
    cursor: pointer;
    color: gray;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;
