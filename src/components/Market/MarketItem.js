import styled from "styled-components";
import { ReactComponent as VisitIcon } from "../../assets/images/visit.svg";
import { useState } from "react";
import MarketInfoSmall from "./MarketinfoSmall";

const MarketItem = ({ name, desc, imgSrc }) => {
    const [isSelected, setIsSelected] = useState(false);
    const handleVisit = () => {
        setIsSelected(!isSelected);
    };

    return (
        <MarketContainer>
            <MarketInfoSmall imgSrc={imgSrc} name={name} desc={desc} />
            <VisitButton
                onClick={() => handleVisit()}
                isSelected={isSelected}
            />
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
    opacity: ${(props) => (props.isSelected ? 1 : 0.5)};
`;
