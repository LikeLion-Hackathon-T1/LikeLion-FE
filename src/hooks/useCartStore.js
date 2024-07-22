import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set, get) => ({
            carts: {},
            clickedItem: {},
            clickedStore: {},

            addItem: (storeName, item) =>
                set((state) => {
                    const storeCart = state.carts[storeName] || [];
                    const itemIndex = storeCart.findIndex(
                        (cartItem) => cartItem.name === item.name
                    );

                    if (itemIndex >= 0) {
                        storeCart[itemIndex].count += 1;
                    } else {
                        storeCart.push({ ...item, count: 1 });
                    }

                    return {
                        carts: { ...state.carts, [storeName]: storeCart },
                    };
                }),

            removeItem: (storeName, itemName) =>
                set((state) => {
                    const storeCart = state.carts[storeName] || [];
                    const updatedCart = storeCart.filter(
                        (cartItem) => cartItem.name !== itemName
                    );
                    const updatedCarts = { ...state.carts };
                    const updatedClickedItem = { ...state.clickedItem };

                    if (updatedCart.length === 0) {
                        delete updatedCarts[storeName];
                        delete updatedClickedItem[storeName];
                    } else {
                        updatedCarts[storeName] = updatedCart;
                        if (updatedClickedItem[storeName]) {
                            delete updatedClickedItem[storeName][itemName];
                            if (
                                Object.keys(updatedClickedItem[storeName])
                                    .length === 0
                            ) {
                                delete updatedClickedItem[storeName];
                            }
                        }
                    }

                    const isAllItemsClicked = (storeCart) =>
                        storeCart.every(
                            (item) =>
                                updatedClickedItem[storeName] &&
                                updatedClickedItem[storeName][item.name]
                        );
                    const updatedClickedStore = { ...state.clickedStore };
                    if (isAllItemsClicked(updatedCarts[storeName] || [])) {
                        updatedClickedStore[storeName] = true;
                    } else {
                        delete updatedClickedStore[storeName];
                    }

                    return {
                        carts: updatedCarts,
                        clickedItem: updatedClickedItem,
                        clickedStore: updatedClickedStore,
                    };
                }),

            removeAllStoreItems: (storeName) =>
                set((state) => {
                    const updatedCarts = { ...state.carts };
                    const updatedClickedItem = { ...state.clickedItem };
                    const updatedClickedStore = { ...state.clickedStore };

                    delete updatedCarts[storeName];
                    delete updatedClickedItem[storeName];
                    delete updatedClickedStore[storeName];

                    return {
                        carts: updatedCarts,
                        clickedItem: updatedClickedItem,
                        clickedStore: updatedClickedStore,
                    };
                }),

            removeAllItems: () =>
                set({
                    carts: {},
                    clickedItem: {},
                    clickedStore: {},
                }),

            updateItemCount: (storeName, itemName, count) =>
                set((state) => {
                    const storeCart = state.carts[storeName] || [];
                    const itemIndex = storeCart.findIndex(
                        (cartItem) => cartItem.name === itemName
                    );

                    if (itemIndex >= 0) {
                        if (count <= 0) {
                            storeCart.splice(itemIndex, 1);
                        } else {
                            storeCart[itemIndex].count = count;
                        }
                    }

                    const updatedCarts = { ...state.carts };

                    if (storeCart.length === 0) {
                        delete updatedCarts[storeName];
                    } else {
                        updatedCarts[storeName] = storeCart;
                    }

                    return {
                        carts: updatedCarts,
                    };
                }),

            totalItemCount: () =>
                Object.values(get().carts).reduce(
                    (total, storeCart) =>
                        total +
                        storeCart.reduce((sum, item) => sum + item.count, 0),
                    0
                ),

            clickItem: (storeName, itemName) =>
                set((state) => {
                    const updatedClickedItem = { ...state.clickedItem };
                    if (updatedClickedItem[storeName]) {
                        if (updatedClickedItem[storeName][itemName]) {
                            delete updatedClickedItem[storeName][itemName];
                            if (
                                Object.keys(updatedClickedItem[storeName])
                                    .length === 0
                            ) {
                                delete updatedClickedItem[storeName];
                            }
                        } else {
                            updatedClickedItem[storeName][itemName] = true;
                        }
                    } else {
                        updatedClickedItem[storeName] = { [itemName]: true };
                    }

                    const isAllItemsClicked = (storeCart) =>
                        storeCart.every(
                            (item) =>
                                updatedClickedItem[storeName] &&
                                updatedClickedItem[storeName][item.name]
                        );
                    const updatedClickedStore = { ...state.clickedStore };
                    const storeCart = state.carts[storeName] || [];
                    if (isAllItemsClicked(storeCart)) {
                        updatedClickedStore[storeName] = true;
                    } else {
                        delete updatedClickedStore[storeName];
                    }

                    return {
                        clickedItem: updatedClickedItem,
                        clickedStore: updatedClickedStore,
                    };
                }),

            clickStore: (storeName) =>
                set((state) => {
                    const storeCart = state.carts[storeName] || [];
                    const updatedClickedItem = { ...state.clickedItem };
                    const updatedClickedStore = { ...state.clickedStore };

                    if (updatedClickedStore[storeName]) {
                        delete updatedClickedItem[storeName];
                        delete updatedClickedStore[storeName];
                    } else {
                        updatedClickedItem[storeName] = storeCart.reduce(
                            (acc, item) => {
                                acc[item.name] = true;
                                return acc;
                            },
                            {}
                        );
                        updatedClickedStore[storeName] = true;
                    }

                    return {
                        clickedItem: updatedClickedItem,
                        clickedStore: updatedClickedStore,
                    };
                }),

            isStoreClicked: (storeName) => {
                const { clickedItem, carts } = get();
                const storeCart = carts[storeName] || [];
                const storeClickedItems = clickedItem[storeName] || {};

                return (
                    storeCart.length > 0 &&
                    storeCart.every((item) => storeClickedItems[item.name])
                );
            },

            isAnyItemClicked: () => {
                const { clickedItem } = get();
                return Object.keys(clickedItem).length > 0;
            },

            removeClickedItem: (storeName, itemName) =>
                set((state) => {
                    const updatedClickedItem = { ...state.clickedItem };
                    if (
                        updatedClickedItem[storeName] &&
                        updatedClickedItem[storeName][itemName]
                    ) {
                        delete updatedClickedItem[storeName][itemName];
                        if (
                            Object.keys(updatedClickedItem[storeName])
                                .length === 0
                        ) {
                            delete updatedClickedItem[storeName];
                        }
                    }

                    const isAllItemsClicked = (storeCart) =>
                        storeCart.every(
                            (item) =>
                                updatedClickedItem[storeName] &&
                                updatedClickedItem[storeName][item.name]
                        );
                    const updatedClickedStore = { ...state.clickedStore };
                    const storeCart = state.carts[storeName] || [];
                    if (isAllItemsClicked(storeCart)) {
                        updatedClickedStore[storeName] = true;
                    } else {
                        delete updatedClickedStore[storeName];
                    }

                    return {
                        clickedItem: updatedClickedItem,
                        clickedStore: updatedClickedStore,
                    };
                }),

            removeClickedStore: (storeName) =>
                set((state) => {
                    const updatedClickedStore = { ...state.clickedStore };
                    delete updatedClickedStore[storeName];

                    const updatedClickedItem = { ...state.clickedItem };
                    delete updatedClickedItem[storeName];

                    return {
                        clickedStore: updatedClickedStore,
                        clickedItem: updatedClickedItem,
                    };
                }),

            deleteClickedItems: () =>
                set((state) => {
                    const { clickedItem, carts } = state;
                    const updatedCarts = { ...carts };

                    Object.keys(clickedItem).forEach((storeName) => {
                        const storeClickedItems = clickedItem[storeName];
                        if (updatedCarts[storeName]) {
                            updatedCarts[storeName] = updatedCarts[
                                storeName
                            ].filter((item) => !storeClickedItems[item.name]);

                            if (updatedCarts[storeName].length === 0) {
                                delete updatedCarts[storeName];
                            }
                        }
                    });

                    return {
                        carts: updatedCarts,
                        clickedItem: {},
                        clickedStore: {},
                    };
                }),

            deleteClickedStores: () =>
                set((state) => {
                    const { clickedStore, carts } = state;
                    const updatedCarts = { ...carts };

                    Object.keys(clickedStore).forEach((storeName) => {
                        delete updatedCarts[storeName];
                    });

                    return {
                        carts: updatedCarts,
                        clickedStore: {},
                    };
                }),
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;
