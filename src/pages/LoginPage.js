import React from "react";
import styled from "styled-components";
import KaKaoLogin from "../assets/images/kakao_login.png";

const LoginPage = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoAuthUrl;
    };
    return (
        <Container>
            <Header>
                <Title>로그인</Title>
            </Header>
            <Body>
                <LoginButton onClick={handleLogin}>
                    <LoginImage src={KaKaoLogin} alt="kakao_login" />
                </LoginButton>
            </Body>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled.header`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 72px;
    color: black;
    margin-top: 80px;
`;

const Body = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginButton = styled.button`
    border: none;
    background-color: transparent;
`;

const LoginImage = styled.img`
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
`;

export default LoginPage;
