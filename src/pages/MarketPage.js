import React, { useState } from "react";
import Header from "components/Common/Header";
import NavBar from "components/Common/NavBar";
import MarketTab from "components/Market/MarketTab";
import VisitTab from "components/Market/VisitTab";

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
            {selectedNav === "홈" ? <MarketTab /> : <VisitTab />}
        </div>
    );
};

export default MarketPage;
