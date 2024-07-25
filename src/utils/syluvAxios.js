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
            console.log("Request sent:", config);
            return config;
        },
        (error) => {
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );

    syluvAxios.interceptors.response.use(
        (response) => {
            console.log("Response received:", response);
            return response;
        },
        function (error) {
            console.error("Response error:", error);
            // 로그인 페이지로 이동
            removeAccessToken();
            removeRefreshToken();
            navigate("/login", { replace: true });
            console.log(error.response.status);
            // const originalRequest = error.config;
            // if (
            //     error.response &&
            //     error.response.status === 400 &&
            //     !originalRequest._retry
            // ) {
            //     originalRequest._retry = true;
            //     return syluvAxios
            //         .get("/users/reissue", {
            //             headers: {
            //                 RefreshToken: getRefreshToken(),
            //             },
            //         })
            //         .then((res) => {
            //             if (res.status === 200) {
            //                 console.log("토큰 재발급 성공");
            //                 setAccessToken(res.data.payload.accessToken);
            //                 setRefreshToken(res.data.payload.refreshToken);
            //                 axios.defaults.headers.common[
            //                     "AccessToken"
            //                 ] = `${res.data.payload.accessToken}`;
            //                 originalRequest.headers[
            //                     "AccessToken"
            //                 ] = `${res.data.payload.accessToken}`;
            //                 return axios(originalRequest);
            //             }
            //         })
            //         .catch((reissueError) => {
            //             console.error(
            //                 "토큰 재발급 중 에러가 발생했습니다:",
            //                 reissueError
            //             );
            //             removeAccessToken();
            //             removeRefreshToken();
            //             navigate("/login", { replace: true });
            //             return Promise.reject(reissueError);
            //         });
            // } else {
            //     console.error("오류 발생:", error);
            //     return Promise.reject(error);
            // }
        }
    );

    return syluvAxios;
};

export default CreateSyluvAxios;
