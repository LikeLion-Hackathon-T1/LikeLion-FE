import { useNavigate } from "react-router-dom";
import Header from "components/Common/Header";
import KakaoMap from "components/Map/Map";
import useTokenStore from "hooks/useTokenStore";
import useIsLogin from "hooks/useIsLogin";
import axios from "axios";
import useSyluvAxios from "hooks/useSyluvAxios";
import TabBar from "components/Common/TabBar";

const HomePage = () => {
    const navigate = useNavigate();
    const {
        removeAccessToken,
        removeRefreshToken,
        getRefreshToken,
        getName,
        removeName,
    } = useTokenStore();
    const isLogin = useIsLogin();
    const syluvAxios = useSyluvAxios();

    return (
        <>
            <Header title="홈" back={false} />
            <KakaoMap />
            <button onClick={() => navigate("/menuTest")}>
                장바구니 테스트
            </button>
            <button onClick={() => navigate("/market/1")}>시장 정보</button>
            <button onClick={() => navigate("/market/1/1")}>가게 정보</button>
            <button onClick={() => navigate("/qrgen")}>QR생성</button>
            <button onClick={() => navigate("/qr")}>QR스캔</button>
            <button
                onClick={() =>
                    axios
                        .get("https://syluv.link/v1/users/reissue", {
                            headers: { RefreshToken: getRefreshToken() },
                        })
                        .then((res) => {
                            console.log(res);
                        })
                }
            >
                재발급
            </button>
            {!isLogin && (
                <button onClick={() => navigate("/login")}>로그인</button>
            )}
            {isLogin && (
                <button
                    onClick={() => {
                        syluvAxios
                            .delete("/users/logout", {
                                params: { name: getName() },
                                headers: { RefreshToken: getRefreshToken() },
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        removeAccessToken();
                        removeRefreshToken();
                        removeName();
                        window.location.reload();
                    }}
                >
                    로그아웃
                </button>
            )}
            {/* <TabBar /> */}
        </>
    );
};

export default HomePage;
