import { create } from "zustand";

export const useTokenStore = create((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearTokens: () => set({ accessToken: null }),
}));

export default useTokenStore;
