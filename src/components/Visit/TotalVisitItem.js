import styled from "styled-components";
import { ReactComponent as Time } from "assets/images/visit_time.svg";
import { ReactComponent as Time2 } from "assets/images/visit_time2.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TotalVisitItem = ({ item, isLast, index }) => {
    const [status, setStatus] = useState(null);
    const [style, setStyle] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        switch (item.status) {
            case "BEFORE":
                setStatus("방문 전");
                break;
            case "PREPARING":
                setStatus("준비 중");
                setStyle(true);
                break;
            case "PREPARED":
                setStatus("준비 완료");
                setStyle(true);
                break;
            case "VISITED":
                setStatus("방문 완료");
                break;
            default:
                setStatus("Unknown status");
                break;
        }
    }, []);
    return (
        <>
            <ListItem
                onClick={() => {
                    navigate(`/market/1/${item.storeId}`);
                }}
            >
                <Container>
                    <Number>{index + 1}</Number>
                    {!isLast && <div className="line" />}
                </Container>

                <Wrapper>
                    <div className="store">
                        <img src={item.imageUrl} alt="store" />
                        <div className="store-info">
                            <div>
                                <div className="store-header">
                                    <span>타입안줌백엔드</span>
                                    <span className="store-name">
                                        {item.store}
                                    </span>
                                </div>
                            </div>
                            <div className={`status ${style ? "color" : ""}`}>
                                {status}
                            </div>
                        </div>
                    </div>
                    <div className="time">
                        {style ? <Time2 /> : <Time />}
                        <span className={`${style ? "color" : ""}`}>
                            {item.visitedTime}
                        </span>
                    </div>
                </Wrapper>
            </ListItem>
        </>
    );
};

export default TotalVisitItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    .line {
        border-left: 1px solid ${({ theme }) => theme.color.gray100};
        width: 0px;
        height: 77px;
        margin-left: 10.5px;
    }
`;

const Number = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontSize.semiBold};
    color: white;
`;

const ListItem = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    img {
        border-radius: 14px;
        width: 70px;
        height: 70px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    margin-left: 12px;

    .store {
        display: flex;
        gap: 12px;
    }

    .store-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 3px 0;
    }

    .store-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray400};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        .store-name {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray900};
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
    }

    .time {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray300};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    .status {
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray300};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    .color {
        color: ${({ theme }) => theme.color.primary};
    }
`;
