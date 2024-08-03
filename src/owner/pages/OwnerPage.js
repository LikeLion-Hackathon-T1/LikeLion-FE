import NavBar from "components/Common/NavBar";
import useSyluvAxios from "hooks/useSyluvAxios";
import MenuEditTab from "owner/components/MenuEditTab";
import OrderManageTab from "owner/components/OrderManageTab";
import OwnerHeader from "owner/components/OwnerHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";

const OwnerPage = () => {
    const syluvAxios = useSyluvAxios();
    const menus = ["메뉴 관리", "주문 관리"];
    const [selected, setSelected] = useState(menus[0]);
    const [allStoreInfo, setAllStoreInfo] = useState([]);
    const [storeInfo, setStoreInfo] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        syluvAxios.get(`/store/info`).then((res) => {
            setAllStoreInfo(res.data.payload);
            setStoreInfo(res.data.payload[0]);
            setItems(res.data.payload[0].menuDetails);
        });
    }, []);

    const handleSelected = (item) => {
        setSelected(item);
    };

    return (
        <>
            <Header>
                <OwnerHeader name={storeInfo.name} />
                <NavBar
                    items={menus}
                    selected={selected}
                    handleSelected={handleSelected}
                    margin={false}
                />
            </Header>
            {selected === "메뉴 관리" ? (
                <MenuEditTab items={items} setItems={setItems} />
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
