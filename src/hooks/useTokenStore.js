import { useCookies } from "react-cookie";

const useTokenStore = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

    const setRefreshToken = (refreshToken) => {
        setCookie("refreshToken", refreshToken, { path: "/" });
    };

    const getRefreshToken = () => {
        return cookies["refreshToken"];
    };

    const removeRefreshToken = () => {
        removeCookie("refreshToken", { path: "/" });
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

    return {
        setRefreshToken,
        getRefreshToken,
        removeRefreshToken,
        setAccessToken,
        getAccessToken,
        removeAccessToken,
    };
};

export default useTokenStore;
