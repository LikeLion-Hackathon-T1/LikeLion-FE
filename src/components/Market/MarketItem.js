import styled from "styled-components";
import { ReactComponent as VisitIcon } from "assets/images/visit.svg";
import { useState } from "react";
import useSyluvAxios from "hooks/useSyluvAxios";
import VisitModal from "./VisitModal";
import MarketInfoSmall from "./MarketinfoSmall";
import { useNavigate } from "react-router-dom";

const MarketItem = ({
    storeId = 0,
    type = "전체",
    name = "가게 이름",
    desc = "설명이 없습니다.",
    imgSrc = "https://via.placeholder.com/150",
    marketId = 0,
}) => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [selected, setIsSelected] = useState(false);
    const [isVisitClicked, setIsVisitClicked] = useState(false);
    const handleVisit = () => {
        setIsSelected(true);
        syluvAxios.post(`/market/${storeId}/visitlist`, {
            storeId: storeId,
        });
        setIsVisitClicked(false);
    };

    const handleClick = () => {
        navigate(`/market/${marketId}/${storeId}`);
    };

    return (
        <MarketContainer>
            <MarketInfoSmall
                imgSrc={imgSrc}
                type={type}
                name={name}
                desc={desc}
                onClick={handleClick}
            />
            <VisitButton
                onClick={() => {
                    if (!selected) {
                        setIsVisitClicked(true);
                    } else {
                        setIsSelected(false);
                        syluvAxios.delete(
                            `/market/${storeId}/visitlist/delete` //visitlist 아이디로 바꿔야함
                        );
                    }
                }}
                selected={selected}
            />
            {isVisitClicked && (
                <VisitModal
                    name={name}
                    onCancle={() => setIsVisitClicked(false)}
                    onConfirm={handleVisit}
                />
            )}
        </MarketContainer>
    );
};

export default MarketItem;

const MarketContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
`;

const VisitButton = styled(VisitIcon)`
    cursor: pointer;
    color: gray;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;
