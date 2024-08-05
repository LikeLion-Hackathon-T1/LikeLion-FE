import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useIsLogin from "hooks/useIsLogin";
import KakaoLogin from "assets/images/kakao_login.png";
import { ReactComponent as SyluvLogo } from "assets/images/syluv.svg";
import Splash from "components/Common/Splash";
import SyluvIcon from "assets/images/app-icon.png";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoAuthUrl;
    };
    const navigate = useNavigate();
    const isLogin = useIsLogin();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
    }, []);

    useEffect(() => {
        if (isLogin) {
            navigate("/", { replace: true });
        }
    }, [isLogin, navigate]);

    return isLoading ? (
        <Splash />
    ) : (
        <Container>
            <Header>
                <Title>달콤한 시장 나들이,</Title>
                <SyluvLogo />
            </Header>
            <img src={SyluvIcon} alt="syluv icon" />
            <Body>
                <LoginButton onClick={handleLogin}>
                    <LoginImg src={KakaoLogin} alt="kakao login" />
                </LoginButton>
            </Body>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 68px;
    height: 100dvh;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 19px;
    margin-bottom: 11px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.primary};
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginImg = styled.img`
    width: 400px;
    @media (max-width: 480px) {
        width: 335px;
    }
`;

const LoginButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        transition: transform 0.2s;

        filter: brightness(1.02);
    }
`;

export default LoginPage;
