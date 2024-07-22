import axios from "axios";
import useTokenStore from "hooks/useTokenStore";

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
    const syluvAxios = axios.create({
        withCredentials: true,
        baseURL: baseURL + "/v1",
        timeout: 10000,
    });

    const token = getAccessToken();
    if (token) {
        syluvAxios.defaults.headers.common["AccessToken"] = `${token}`;
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
                        .get("/users/reissue", {
                            headers: {
                                RefreshToken: getRefreshToken(),
                            },
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                setAccessToken(res.data.payload.accessToken);
                                setRefreshToken(res.data.payload.refreshToken);
                                axios.defaults.headers.common[
                                    "AccessToken"
                                ] = `${res.data.accessToken}`;
                                return axios(originalRequest);
                            }
                        })
                        .catch((error) => {
                            console.log("토큰 재발급 중 에러가 발생했습니다.");
                            removeAccessToken();
                            removeRefreshToken();
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

export default CreateSyluvAxios;
