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
            <button onClick={() => navigate("/market")}>마켓</button>
        </>
    );
};

export default HomePage;
