import { Map } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="홈" back={false} />
            <Map // 지도를 표시할 Container
                center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "450px",
                }}
                level={3} // 지도의 확대 레벨
            />
            <button onClick={() => navigate("/menuTest")}>메뉴테스트</button>
        </div>
    );
};

export default HomePage;
