import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useIsLogin from "hooks/useIsLogin";
import KakaoLogin from "assets/images/kakao_login.png";
import { ReactComponent as SyluvLogo } from "assets/images/syluv.svg";

const LoginPage = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoAuthUrl;
    };
    const navigate = useNavigate();
    const isLogin = useIsLogin();

    useEffect(() => {
        if (isLogin) {
            navigate("/", { replace: true });
        }
    }, [isLogin, navigate]);
    return (
        <Container>
            <Header>
                <Title>달콤한 시장 여행의 시작,</Title>
                <SyluvLogo />
            </Header>
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
    height: 100dvh;
    gap: 72px;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 26px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginImg = styled.img`
    width: 400px;
    @media (max-width: 480px) {
        width: calc(100dvw-80px);
    }
`;

const LoginButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

export default LoginPage;
