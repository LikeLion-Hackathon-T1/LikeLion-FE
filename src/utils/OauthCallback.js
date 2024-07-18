import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useTokenStore from "hooks/useTokenStore";
import { useNavigate } from "react-router-dom";

const OauthCallback = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const { setRefreshToken, setAccessToken } = useTokenStore();
    const navigate = useNavigate();

    const getKakaoToken = useCallback(async (code) => {
        try {
            const response = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
                    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
                    code: code,
                }).toString(),
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
    }, []);

    const getSyluvToken = useCallback(async (idToken) => {
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
    }, []);

    const fetchTokens = useCallback(async () => {
        try {
            const code = new URL(window.location.href).searchParams.get("code");
            const idToken = await getKakaoToken(code);
            const syluvData = await getSyluvToken(idToken);
            setAccessToken(syluvData.accessToken);
            setRefreshToken(syluvData.refreshToken);
            navigate("/", { replace: true });
        } catch (error) {
            setIsError(true);
            setError(error);
            navigate("/login", { replace: true });
        } finally {
            setIsLoading(false);
        }
    }, [
        getKakaoToken,
        getSyluvToken,
        setAccessToken,
        setRefreshToken,
        navigate,
    ]);

    useEffect(() => {
        fetchTokens();
    }, [fetchTokens]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return <p>Login</p>;
};

export default OauthCallback;
