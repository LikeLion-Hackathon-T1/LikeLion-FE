import Cookies from "js-cookie";

const useTokenStore = () => {
    const setRefreshToken = (refreshToken) => {
        Cookies.set("refreshToken", refreshToken, { path: "/" });
    };

    const getRefreshToken = () => {
        return Cookies.get("refreshToken");
    };

    const removeRefreshToken = () => {
        Cookies.remove("refreshToken", { path: "/" });
    };

    const setAccessToken = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
    };

    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    };

    const removeAccessToken = () => {
        localStorage.removeItem("accessToken");
    };

    const setName = (nickName) => {
        Cookies.set("nickName", nickName, { path: "/" });
    };

    const getName = () => {
        return Cookies.get("nickName");
    };

    const removeName = () => {
        Cookies.remove("nickName", { path: "/" });
    };

    return {
        setRefreshToken,
        getRefreshToken,
        removeRefreshToken,
        setAccessToken,
        getAccessToken,
        removeAccessToken,
        setName,
        getName,
        removeName,
    };
};

export default useTokenStore;
