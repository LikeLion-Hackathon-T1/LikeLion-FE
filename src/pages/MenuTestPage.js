import React from "react";
import useCartStore from "../hooks/useCartStore";
import Header from "../components/Common/Header";
import styled from "styled-components";

const stores = [
    {
        name: "Store 1",
        items: [
            { name: "Item 1-1", price: 10 },
            { name: "Item 1-2", price: 15 },
        ],
    },
    {
        name: "Store 2",
        items: [
            { name: "Item 2-1", price: 8 },
            { name: "Item 2-2", price: 12 },
        ],
    },
    {
        name: "Store 3",
        items: [
            { name: "Item 3-1", price: 20 },
            { name: "Item 3-2", price: 25 },
            { name: "Item 3-3", price: 30 },
        ],
    },
    {
        name: "Store 4",
        items: [
            { name: "Item 4-1", price: 5 },
            { name: "Item 4-2", price: 7 },
        ],
    },
    {
        name: "Store 5",
        items: [
            { name: "Item 5-1", price: 13 },
            { name: "Item 5-2", price: 18 },
        ],
    },
    {
        name: "Store 6",
        items: [
            { name: "Item 6-1", price: 22 },
            { name: "Item 6-2", price: 27 },
        ],
    },
    {
        name: "Store 7",
        items: [
            { name: "Item 7-1", price: 6 },
            { name: "Item 7-2", price: 9 },
        ],
    },
    {
        name: "Store 8",
        items: [
            { name: "Item 8-1", price: 11 },
            { name: "Item 8-2", price: 14 },
        ],
    },
    {
        name: "Store 9",
        items: [
            { name: "Item 9-1", price: 17 },
            { name: "Item 9-2", price: 19 },
        ],
    },
    {
        name: "Store 10",
        items: [
            { name: "Item 10-1", price: 21 },
            { name: "Item 10-2", price: 23 },
            { name: "Item 10-3", price: 28 },
        ],
    },
];

const MenuTestPage = () => {
    const { addItem, removeItem, updateItemCount, carts } = useCartStore();

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
