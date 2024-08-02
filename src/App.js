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
import theme from "styles/SyluvTheme";
import StorePage from "pages/StorePage";
import QrPage from "pages/QrPage";
import QrGenPage from "pages/QrGenPage";
import MenuItemDetail from "./components/Store/MenuItemDetail";
import OrderListPage from "pages/OrderListPage";
import OrderDetailPage from "pages/OrderDetailPage";
import OrderPage from "pages/OrderPage";
import VisitListPage from "pages/VisitListPage";
import OrderSuccess from "pages/OrderSuccess";
import MyPage from "pages/MyPage";
import OwnerPage from "owner/pages/OwnerPage";
import OwnerDetailPage from "owner/pages/OwnerDetailPage";
import useSyluvAxios from "hooks/useSyluvAxios";
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
                                    path="/market/:marketId"
                                    element={<MarketPage />}
                                />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/order" element={<OrderPage />} />
                                <Route
                                    path="/ordersuccess"
                                    element={<OrderSuccess />}
                                />
                                <Route
                                    path="/menuTest"
                                    element={<MenuTestPage />}
                                />
                                <Route
                                    path="/market/:marketId/:storeId"
                                    element={<StorePage />}
                                />
                                <Route
                                    path="/orderlist"
                                    element={<OrderListPage />}
                                />
                                <Route
                                    path="/order/:orderId"
                                    element={<OrderDetailPage />}
                                />
                                <Route
                                    path="/menu/:menuItemId"
                                    element={<MenuItemDetail />}
                                />
                                <Route
                                    path="/visit"
                                    element={<VisitListPage />}
                                />
                                <Route path="/mypage" element={<MyPage />} />
                                <Route path="/qr" element={<QrPage />} />
                                <Route path="/qrgen" element={<QrGenPage />} />
                                <Route
                                    path="/oauth/kakao/callback"
                                    element={<OauthCallback />}
                                />
                                <Route
                                    path="/owner/:storeId"
                                    element={<OwnerPage />}
                                />
                                <Route
                                    path="/owner/:storeId/:orderId"
                                    element={<OwnerDetailPage />}
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
