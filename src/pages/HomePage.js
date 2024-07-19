import { useNavigate } from "react-router-dom";
import Header from "components/Common/Header";
import KakaoMap from "components/Map/Map";
import useTokenStore from "hooks/useTokenStore";
import useIsLogin from "hooks/useIsLogin";

const HomePage = () => {
    const navigate = useNavigate();
    const { removeAccessToken, removeRefreshToken } = useTokenStore();
    const isLogin = useIsLogin();

    return (
        <>
            <Header title="홈" back={false} />
            <KakaoMap />
            <button onClick={() => navigate("/menuTest")}>
                장바구니 테스트
            </button>
            <button onClick={() => navigate("/market")}>시장 정보</button>
            <button onClick={() => navigate("/store")}>가게 정보</button>
            {!isLogin && (
                <button onClick={() => navigate("/login")}>로그인</button>
            )}
            {isLogin && (
                <button
                    onClick={() => {
                        removeAccessToken();
                        removeRefreshToken();
                        window.location.reload();
                    }}
                >
                    로그아웃
                </button>
            )}
        </>
    );
};

export default HomePage;
