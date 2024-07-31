import NavBar from "components/Common/NavBar";
import MenuEditTab from "owner/components/MenuEditTab";
import OrderManageTab from "owner/components/OrderManageTab";
import OwnerHeader from "owner/components/OwnerHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const OwnerPage = () => {
    const { storeId } = useParams();
    const menus = ["메뉴 관리", "주문 관리"];
    const [selected, setSelected] = useState(menus[0]);
    const item = {
        menuImage: "https://via.placeholder.com/100",
        name: "아메리카노",
        price: 3000,
        content: "최고의 아메리카노",
    };

    const handleSelected = (item) => {
        setSelected(item);
    };

    return (
        <>
            <Header>
                <OwnerHeader name={"꽃분이네"} />
                <NavBar
                    items={menus}
                    selected={selected}
                    handleSelected={handleSelected}
                    margin={false}
                />
            </Header>
            {selected === "메뉴 관리" ? (
                <MenuEditTab item={item} />
            ) : (
                <OrderManageTab />
            )}
        </>
    );
};

export default OwnerPage;

const Header = styled.div`
    position: fixed;
    background-color: white;
    width: 480px;

    @media (max-width: 480px) {
        width: 100%;
    }
`;
