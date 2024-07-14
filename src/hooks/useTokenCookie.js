import { useCookies } from "react-cookie";

export const useTokenCookie = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

    const setRefreshToken = (token) => {
        setCookie("refreshToken", token, { path: "/", httpOnly: true });
    };

    const getRefreshToken = () => {
        return cookies["refreshToken"];
    };

    const removeRefreshToken = () => {
        removeCookie("refreshToken", { path: "/" });
    };

    return { setRefreshToken, getRefreshToken, removeRefreshToken };
};

export default useTokenCookie;
