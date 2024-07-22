import React, { useState } from "react";
import Header from "components/Common/Header";
import NavBar from "components/Common/NavBar";
import MarketTab from "components/Market/MarketTab";
import VisitTab from "components/Market/VisitTab";
import styled from "styled-components";
import MarketInfo from "components/Market/MarketInfo";

const MarketPage = () => {
    const items = ["홈", "방문"];
    const [selectedNav, setSelectedNav] = useState(items[0]);

    const handleNavClick = (navItem) => {
        setSelectedNav(navItem);
    };

    return (
        <div>
            <Header title="광장시장" />
            <NavBar
                items={items}
                selected={selectedNav}
                handleSelected={handleNavClick}
            />
            <MarketInfo
                imgSrc="https://via.placeholder.com/160"
                call="02-1234-5678"
                address="서울특별시 종로구 창경궁로 123"
                time="09:00 ~ 22:30 (일요일 휴무)"
            />
            {selectedNav === "홈" ? <MarketTab /> : <VisitTab />}
        </div>
    );
};

export default MarketPage;
