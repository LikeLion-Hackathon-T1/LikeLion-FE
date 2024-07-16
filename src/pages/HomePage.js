import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import KakaoMap from "../components/Map/Map";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="홈" back={false} />
            <KakaoMap />
            <button onClick={() => navigate("/menuTest")}>
                장바구니 테스트
            </button>
        </div>
    );
};

export default HomePage;
