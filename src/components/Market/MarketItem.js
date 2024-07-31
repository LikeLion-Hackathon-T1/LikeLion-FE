import styled from "styled-components";
import { ReactComponent as VisitIcon } from "assets/images/visit.svg";
import { useEffect, useState } from "react";
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
    visitList,
    onChange = () => {},
}) => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const [isSelected, setIsSelected] = useState(false);
    const [isVisitClicked, setIsVisitClicked] = useState(false);
    const [visitListId, setVisitListId] = useState(null);

    useEffect(() => {
        const matchedVisit = visitList?.find(
            (item) => item.storeId === storeId
        );
        const inVisitList = matchedVisit !== undefined;
        const visitListId = matchedVisit ? matchedVisit.visitListId : null;
        setIsSelected(inVisitList);
        setVisitListId(visitListId);
    }, [visitList, storeId]);

    const handleVisit = () => {
        syluvAxios
            .post(`/market/${storeId}/visitlist`, {
                storeId: storeId,
            })
            .finally(() => {
                onChange();
            });
        setIsVisitClicked(false);
        setIsSelected(true);
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
                    if (isSelected) {
                        syluvAxios
                            .delete(`/market/${visitListId}/visitlist/delete`)
                            .then((response) => {
                                setIsSelected(false);
                            })
                            .finally(() => {
                                onChange();
                            });
                    } else {
                        handleVisit();
                    }
                }}
                selected={isSelected}
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
    min-width: 24px;
    cursor: pointer;
    color: gray;
    opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;
