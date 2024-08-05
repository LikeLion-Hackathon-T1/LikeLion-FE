import useTokenStore from "./useTokenStore";

const useIsLogin = () => {
    const { getAccessToken, getRefreshToken } = useTokenStore();

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    return !!accessToken && !!refreshToken;
};

export default useIsLogin;
