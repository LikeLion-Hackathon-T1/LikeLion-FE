import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./pages/LoginPage";
import OauthCallback from "./utils/OauthCallback";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import MenuTestPage from "./pages/MenuTestPage";
import MarketPage from "./pages/MarketPage";
import { ScrollContainer } from "./styles/SyluvStyle";

const App = () => {
    return (
        <ScrollContainer>
            <Container>
                <MobileContainer>
                    <ContentContainer>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/market"
                                    element={<MarketPage />}
                                />
                                <Route path="/cart" element={<CartPage />} />
                                <Route
                                    path="/menuTest"
                                    element={<MenuTestPage />}
                                />
                                <Route
                                    path="/oauth/kakao/callback"
                                    element={<OauthCallback />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </ContentContainer>
                </MobileContainer>
            </Container>
        </ScrollContainer>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background-color: #f0f0f0;
    flex-direction: column;
`;

const MobileContainer = styled.div`
    width: 480px;
    min-height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
    overflow-wrap: break-word;

    @media (max-width: 480px) {
        width: 100dvw;
        padding: 0;
        box-shadow: none;
    }
`;

const ContentContainer = styled.div`
    padding: 80px 20px 0 20px;
`;

export default App;
