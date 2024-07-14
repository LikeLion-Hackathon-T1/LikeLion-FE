// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./pages/LoginPage";
import OauthCallback from "./utils/OauthCallback";

const App = () => {
    return (
        <Container>
            <MobileContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/oauth/kakao/callback"
                            element={<OauthCallback />}
                        />
                    </Routes>
                </BrowserRouter>
            </MobileContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
    flex-direction: column;
`;

const MobileContainer = styled.div`
    width: 480px;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
    overflow-wrap: break-word;
`;

export default App;
