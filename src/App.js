import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import LoginPage from "pages/LoginPage";
import OauthCallback from "utils/OauthCallback";
import HomePage from "pages/HomePage";
import CartPage from "pages/CartPage";
import MenuTestPage from "pages/MenuTestPage";
import MarketPage from "pages/MarketPage";
import { ScrollContainer } from "styles/SyluvStyle";
import StorePage from "pages/StorePage";
import theme from "styles/SyluvTheme";

const App = () => {
    useEffect(() => {
        if (window.location.host === "syluv.store") {
            window.location.replace(
                "https://www.syluv.store" + window.location.pathname
            );
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <ScrollContainer>
                <Container>
                    <MobileContainer>
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
                                <Route path="/store" element={<StorePage />} />
                                <Route
                                    path="/oauth/kakao/callback"
                                    element={<OauthCallback />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </MobileContainer>
                </Container>
            </ScrollContainer>
        </ThemeProvider>
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

export default App;
