import React from "react";
import useCartStore from "hooks/useCartStore";
import Header from "components/Common/Header";
import styled from "styled-components";

const stores = [
    {
        name: "김씨 과일가게",
        items: [
            { name: "사과", price: 10 },
            { name: "바나나", price: 15 },
        ],
    },
    {
        name: "이씨 채소가게",
        items: [
            { name: "배추", price: 8 },
            { name: "시금치", price: 12 },
        ],
    },
    {
        name: "박씨 정육점",
        items: [
            { name: "삼겹살", price: 20 },
            { name: "등심", price: 25 },
            { name: "갈비", price: 30 },
        ],
    },
    {
        name: "최씨 생선가게",
        items: [
            { name: "고등어", price: 5 },
            { name: "오징어", price: 7 },
        ],
    },
    {
        name: "한씨 두부가게",
        items: [
            { name: "두부", price: 13 },
            { name: "콩나물", price: 18 },
        ],
    },
    {
        name: "정씨 반찬가게",
        items: [
            { name: "김치", price: 22 },
            { name: "깍두기", price: 27 },
        ],
    },
    {
        name: "윤씨 제과점",
        items: [
            { name: "붕어빵", price: 6 },
            { name: "호떡", price: 9 },
        ],
    },
    {
        name: "권씨 떡집",
        items: [
            { name: "인절미", price: 11 },
            { name: "송편", price: 14 },
        ],
    },
    {
        name: "오씨 잡화점",
        items: [
            { name: "주방용품", price: 17 },
            { name: "청소용품", price: 19 },
        ],
    },
    {
        name: "장씨 한약방",
        items: [
            { name: "인삼", price: 21 },
            { name: "감초", price: 23 },
            { name: "홍삼", price: 28 },
        ],
    },
];

const MenuTestPage = () => {
    const { addItem, removeItem, carts } = useCartStore();

    const handleAddItem = (storeName, item) => {
        addItem(storeName, item);
    };

    const handleRemoveItem = (storeName, itemName) => {
        removeItem(storeName, itemName);
    };

    return (
        <div>
            <Header title={"메뉴테스트"} />
            <MenuContainer>
                {stores.map((store) => (
                    <div key={store.name} style={{ marginBottom: "20px" }}>
                        <h2>{store.name}</h2>
                        <ul>
                            {store.items.map((item) => (
                                <li key={item.name}>
                                    {item.name} - ${item.price}
                                    <button
                                        onClick={() =>
                                            handleAddItem(store.name, item)
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRemoveItem(
                                                store.name,
                                                item.name
                                            )
                                        }
                                    >
                                        Remove from Cart
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </MenuContainer>
            <MenuContainer>
                <h2>Cart</h2>
                {Object.keys(carts).map((storeName) => (
                    <div key={storeName} style={{ marginBottom: "20px" }}>
                        <h3>{storeName}</h3>
                        <ul>
                            {carts[storeName].map((cartItem) => (
                                <li key={cartItem.name}>
                                    {cartItem.name} - {cartItem.count}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </MenuContainer>
        </div>
    );
};

const MenuContainer = styled.div`
    overflow-y: auto;
    max-height: 400px;
    margin-bottom: 10px;
`;

export default MenuTestPage;
