import React, { useEffect, useState } from "react";
import axios from "axios";
import useTokenStore from "../hooks/useTokenStore";
import useTokenCookie from "../hooks/useTokenCookie";
import { useNavigate } from "react-router-dom";

const OauthCallback = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const { setRefreshToken } = useTokenCookie();
    const { setAccessToken } = useTokenStore();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        const getKakaoToken = async () => {
            try {
                const response = await axios.post(
                    "https://kauth.kakao.com/oauth/token",
                    {
                        grant_type: "authorization_code",
                        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
                        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
                        code: code,
                    },
                    {
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=utf-8",
                        },
                    }
                );
                return response.data.id_token;
            } catch (error) {
                throw new Error("Failed to get Kakao token");
            }
        };

        const getSyluvToken = async (idToken) => {
            try {
                const response = await axios.post(
                    "https://syluv.link/v1/users/login/kakao",
                    {
                        idToken: idToken,
                    }
                );
                return response.data;
            } catch (error) {
                throw new Error("Failed to get Syluv token");
            }
        };

        const fetchTokens = async () => {
            try {
                const idToken = await getKakaoToken();
                const syluvData = await getSyluvToken(idToken);
                setAccessToken(syluvData.accessToken);
                setRefreshToken(syluvData.refreshToken);
                navigate("/", { replace: true });
            } catch (error) {
                setIsError(true);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokens();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return <p>Login</p>;
};

export default OauthCallback;
