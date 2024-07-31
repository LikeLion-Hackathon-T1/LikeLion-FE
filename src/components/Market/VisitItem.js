import styled from "styled-components";
import { ReactComponent as Time } from "assets/images/visit_time.svg";
import { ReactComponent as Time2 } from "assets/images/visit_time2.svg";
import { useState } from "react";
import Button from "components/Common/Button";

const VisitItem = ({
    index,
    item,
    isLast,
    openId,
    handleOpenModal = () => {},
}) => {
    const onCompleteClick = () => {
        handleOpenModal(null);
    };
    const onCancelClick = () => {
        handleOpenModal(null);
    };
    return (
        <>
            <ListItem
                onClick={() => {
                    handleOpenModal(index);
                }}
            >
                <Container>
                    <Number>{index + 1}</Number>
                    {!isLast && <div className="line" />} {/* 수정된 부분 */}
                </Container>

                <Wrapper>
                    <div className="store">
                        <img
                            src="https://via.placeholder.com/100"
                            alt="store"
                        />
                        <div className="store-info">
                            <di className="store-header">
                                <span>분식</span>
                                <span className="store-name">{item.store}</span>
                            </di>
                            <div className="time">
                                <Time />
                                <span>11:21</span>
                            </div>
                        </div>
                    </div>
                    <div className="status">{item.status}</div>
                </Wrapper>
            </ListItem>
            {openId === index && (
                <ModalContainer>
                    <VisitModal>
                        <span>이 가게에 방문 완료하셨나요?</span>
                        <span className="title-text">{item.store}</span>
                        <span className="sub-text">
                            다시 한 번 확인해주세요
                        </span>
                        <div className="buttons">
                            <Button
                                text="완료했어요"
                                onClick={() => {
                                    onCompleteClick();
                                }}
                            />
                            <Button
                                text="아직이에요"
                                type="2"
                                onClick={() => {
                                    onCancelClick();
                                }}
                            />
                        </div>
                    </VisitModal>
                </ModalContainer>
            )}
        </>
    );
};

export default VisitItem;

const ModalContainer = styled.div`
    z-index: 1000;
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const VisitModal = styled.div`
    width: 296px;
    height: 140px;
    background-color: white;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .buttons {
        width: 100%;
        display: flex;
        gap: 12px;
    }

    font-size: 18px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};

    .title-text {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: ${({ theme }) => theme.color.primary};
        margin-top: 16px;
        margin-bottom: 20px;
    }

    .sub-text {
        font-size: 14px;
        color: ${({ theme }) => theme.color.gray600};
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        margin-bottom: 20px;
    }
`;

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
`;
