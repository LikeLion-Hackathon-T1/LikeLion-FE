import { useNavigate } from "react-router-dom";
import Header from "components/Common/Header";
import KakaoMap from "components/Map/Map";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header title="홈" back={false} />
            <KakaoMap />
            <button onClick={() => navigate("/menuTest")}>구매 테스트</button>
            <button onClick={() => navigate("/market")}>시장 정보</button>
            <button onClick={() => navigate("/store")}>가게 정보</button>
        </>
    );
};

export default HomePage;
