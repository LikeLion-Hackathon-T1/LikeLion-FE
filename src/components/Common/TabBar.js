import { ReactComponent as HomeIcon } from "assets/images/nav-home.svg";
import { ReactComponent as VisitIcon } from "assets/images/nav-visit.svg";
import { ReactComponent as OrderIcon } from "assets/images/nav-order.svg";
import { ReactComponent as MyPageIcon } from "assets/images/nav-my.svg";
import { ReactComponent as QrIcon } from "assets/images/nav-qr.svg";

import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TabBar = ({ activeTab }) => {
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        navigate(`/${tab}`);
    };
    return (
        <>
            <Spacer />
            <Container>
                <div className="wrapper">
                    <div onClick={() => handleTabClick("")}>
                        <HomeIcon
                            stroke={activeTab === "" ? "#FF6B00" : "#cccccc"}
                        />
                        <span
                            style={{
                                color: activeTab === "" ? "#FF6B00" : "#cccccc",
                            }}
                        >
                            홈
                        </span>
                    </div>
                    <div onClick={() => handleTabClick("visit")}>
                        <VisitIcon
                            stroke={
                                activeTab === "visit" ? "#FF6B00" : "#cccccc"
                            }
                            fill={activeTab === "visit" ? "#FF6B00" : "#cccccc"}
                        />
                        <span
                            style={{
                                color:
                                    activeTab === "visit"
                                        ? "#FF6B00"
                                        : "#cccccc",
                            }}
                        >
                            방문
                        </span>
                    </div>
                    <div
                        className="qr-wrapper"
                        onClick={() => handleTabClick("qr")}
                    >
                        <QR />
                    </div>
                    <div onClick={() => handleTabClick("orderlist")}>
                        <OrderIcon
                            stroke={
                                activeTab === "orderlist"
                                    ? "#FF6B00"
                                    : "#cccccc"
                            }
                        />
                        <span
                            style={{
                                color:
                                    activeTab === "orderlist"
                                        ? "#FF6B00"
                                        : "#cccccc",
                            }}
                        >
                            주문
                        </span>
                    </div>
                    <div onClick={() => handleTabClick("mypage")}>
                        <MyPageIcon
                            stroke={
                                activeTab === "mypage" ? "#FF6B00" : "#cccccc"
                            }
                        />
                        <span
                            style={{
                                color:
                                    activeTab === "mypage"
                                        ? "#FF6B00"
                                        : "#cccccc",
                            }}
                        >
                            마이
                        </span>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default TabBar;

const Spacer = styled.div`
    height: 72px;
    width: 1px;
`;

const Container = styled.div`
    z-index: 100;
    position: fixed;
    bottom: 0px;
    width: 480px;
    height: 72px;
    background-color: white;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
    .wrapper {
        position: relative;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            width: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
                font-size: 12px;
                margin-top: 4px;
                color: ${(props) => props.theme.color.gray200};
            }
            cursor: pointer;
        }
        .qr-wrapper {
            width: 72px;
        }
    }
    .qr-wrapper {
        position: relative;
        top: -27px;
        width: 72px;
        height: 72px;
        border-radius: 100%;
        background-color: white;
        box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
        border-top: 1px solid ${(props) => props.theme.color.gray100 * 0.6};
    }

    @media (max-width: 480px) {
        width: 100%;
        .wrapper {
            padding: 0 30px;
        }
    }
`;

const QR = styled(QrIcon)``;
