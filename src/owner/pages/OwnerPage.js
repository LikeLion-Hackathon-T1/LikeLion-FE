import NavBar from "components/Common/NavBar";
import useSyluvAxios from "hooks/useSyluvAxios";
import MenuEditTab from "owner/components/MenuEditTab";
import OrderManageTab from "owner/components/OrderManageTab";
import OwnerHeader from "owner/components/OwnerHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const OwnerPage = () => {
    const { storeId } = useParams();
    const syluvAxios = useSyluvAxios();
    const menus = ["메뉴 관리", "주문 관리"];
    const [selected, setSelected] = useState(menus[0]);
    const [storeInfo, setStoreInfo] = useState({});
    const [items, setItems] = useState([]);
    const [allStores, setAllStores] = useState([]);

    useEffect(() => {
        syluvAxios.get(`/store/info`).then((res) => {
            const store = res.data.payload.filter(
                (store) => store.storeId === Number(storeId)
            );
            setAllStores(res.data.payload);
            setStoreInfo(store[0]);
            setItems(store[0].menuDetails);
        });
    }, [storeId]);

    const handleSelected = (item) => {
        setSelected(item);
    };

    return (
        <>
            <Header>
                <OwnerHeader name={storeInfo.name} stores={allStores} />
                <NavBar
                    items={menus}
                    selected={selected}
                    handleSelected={handleSelected}
                    margin={false}
                />
            </Header>
            {selected === "메뉴 관리" ? (
                <MenuEditTab
                    storeId={storeId}
                    items={items}
                    setItems={setItems}
                />
            ) : (
                <OrderManageTab storeId={storeId} />
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
