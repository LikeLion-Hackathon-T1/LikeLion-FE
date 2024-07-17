import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import KakaoMap from "../components/Map/Map";
import { ScrollContainer } from "../styles/SyluvStyle";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="홈" back={false} />
            <ScrollContainer>
                <KakaoMap />
                <button onClick={() => navigate("/menuTest")}>
                    구매 테스트
                </button>
                <button onClick={() => navigate("/market")}>마켓</button>
            </ScrollContainer>
        </div>
    );
};

export default HomePage;
