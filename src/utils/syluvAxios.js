import axios from "axios";
import useTokenStore from "hooks/useTokenStore";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const baseURL = process.env.REACT_APP_BASE_URL;

const CreateSyluvAxios = (navigate) => {
    const {
        getAccessToken,
        getRefreshToken,
        setAccessToken,
        setRefreshToken,
        removeAccessToken,
        removeRefreshToken,
    } = useTokenStore();

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const isTokenExpired = (token) => {
        const decoded = decodeToken(token);
        if (!decoded) return true;
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    };

    const reissueToken = async () => {
        try {
            const response = await axios.get(baseURL + "/v1/users/reissue", {
                headers: {
                    RefreshToken: getRefreshToken(),
                },
            });

            if (response.status === 200) {
                setAccessToken(response.data.payload.accessToken);
                setRefreshToken(response.data.payload.refreshToken);
                return response.data.payload.accessToken;
            }
        } catch (error) {
            console.error("Token reissue failed:", error);
            removeAccessToken();
            removeRefreshToken();
            navigate("/login", { replace: true });
            return null;
        }
    };

    const syluvAxios = axios.create({
        withCredentials: true,
        baseURL: baseURL + "/v1",
        timeout: 10000,
    });

    let token = getAccessToken();

    syluvAxios.defaults.headers.common["AccessToken"] = token;

    syluvAxios.interceptors.request.use(
        // 토큰 만료 확인 및 재발급 및 리턴
        async (config) => {
            if (isTokenExpired(token)) {
                token = await reissueToken();
                if (token) {
                    config.headers["AccessToken"] = token;
                }
            }
            return config;
        }
    );

    syluvAxios.interceptors.response.use(
        (response) => {
            console.log("Response received:", response);
            return response;
        },
        function (error) {
            console.error("Response error:", error);
        }
    );

    return syluvAxios;
};

export default CreateSyluvAxios;
