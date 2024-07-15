import axios from "axios";
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from "../hooks/useTokenStore";

const baseURL = process.env.REACT_APP_BASE_URL;

const createSyluvAxios = (navigate) => {
    const syluvAxios = axios.create({
        withCredentials: true,
        baseURL: baseURL + "/v1",
        timeout: 10000,
    });

    const token = getAccessToken();
    if (token) {
        syluvAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    syluvAxios.interceptors.request.use(
        function (config) {
            return Promise.resolve(config);
        },
        (error) => Promise.reject(error)
    );

    syluvAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            const originalRequest = error.config;
            if (error.response) {
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return syluvAxios
                        .post("/auth/refresh", {
                            refreshToken: getRefreshToken(),
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                setAccessToken(res.data.accessToken);
                                setRefreshToken(res.data.refreshToken);
                                axios.defaults.headers.common[
                                    "Authorization"
                                ] = `Bearer ${res.data.accessToken}`;
                                return axios(originalRequest);
                            }
                        })
                        .catch((error) => {
                            console.log("토큰 재발급 중 에러가 발생했습니다.");
                            console.log(error);
                            navigate("/login", { replace: true });
                            return Promise.reject(error);
                        });
                } else {
                    return Promise.reject(error);
                }
            }
            return Promise.reject(error);
        }
    );

    return syluvAxios;
};

export default createSyluvAxios;
