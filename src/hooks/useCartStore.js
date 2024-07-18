import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set) => ({
            carts: {},
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

                    if (updatedCart.length === 0) {
                        delete updatedCarts[storeName];
                    } else {
                        updatedCarts[storeName] = updatedCart;
                    }

                    return {
                        carts: updatedCarts,
                    };
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
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore;
