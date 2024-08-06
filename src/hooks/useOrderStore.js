import { create } from "zustand";

const useOrderStore = create((set, get) => ({
    orderData: JSON.parse(localStorage.getItem("orderData")) || {}, // 초기 상태 설정 시 로컬 스토리지에서 데이터 불러오기

    setGlobalOrderData: (newOrderData) => {
        localStorage.setItem("orderData", JSON.stringify(newOrderData)); // 데이터를 로컬 스토리지에 저장
        set({ orderData: newOrderData }); // Zustand 스토어 업데이트
    },

    getGlobalOrderData: () => {
        const data = JSON.parse(localStorage.getItem("orderData")); // 로컬 스토리지에서 데이터 불러오기
        set({ orderData: data }); // Zustand 스토어 업데이트
        return data; // 데이터 반환
    },

    setPaymentKey: (paymentKey) => {
        const data = JSON.parse(localStorage.getItem("orderData")); // 로컬 스토리지에서 데이터 불러오기
        data.paymentKey = paymentKey; // 데이터에 paymentKey 추가
        localStorage.setItem("orderData", JSON.stringify(data)); // 데이터를 로컬 스토리지에 저장
        set({ orderData: data }); // Zustand 스토어 업데이트
    },

    deleteGlobalOrderData: () => {
        localStorage.removeItem("orderData"); // 로컬 스토리지에서 데이터 삭제
        set({ orderData: {} }); // Zustand 스토어 업데이트
    },
}));

export default useOrderStore;
