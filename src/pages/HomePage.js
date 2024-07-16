import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";
import Header from "../components/Common/Header";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HomePage = () => {
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setMapCenter({ latitude, longitude });
                    console.log(position);
                },
                (error) => {
                    console.error(
                        "유저 위치 정보를 가져오는데 실패했습니다.",
                        error
                    );
                }
            );
        } else {
            console.error("브라우저가 Geolocation API를 지원하지 않습니다.");
        }
    };

    const handleUserLocation = (latitude = 0, longitude = 0) => {
        setUserLocation((prev) => {
            return {
                latitude: prev.latitude + latitude,
                longitude: prev.longitude + longitude,
            };
        });
    };

    const handleMapCenter = (latitude = 0, longitude = 0) => {
        setMapCenter({ latitude, longitude });
    };

    return (
        <div>
            <Header title="홈" back={false} />
            {mapCenter && (
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심 위치
                        lat: mapCenter.latitude,
                        lng: mapCenter.longitude,
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "450px",
                    }}
                    level={3} // 지도의 확대 레벨
                >
                    {userLocation && (
                        <MapMarker
                            position={{
                                lat: userLocation.latitude,
                                lng: userLocation.longitude,
                            }}
                        />
                    )}
                </Map>
            )}
            <ButtonContainer>
                <ButtonContainer>
                    <button onClick={() => getUserLocation()}>
                        내 위치 찾기
                    </button>
                    <div>
                        <button onClick={() => handleUserLocation(0.0001, 0)}>
                            위도 +
                        </button>
                        <button onClick={() => handleUserLocation(-0.0001, 0)}>
                            위도 -
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleUserLocation(0, 0.0001)}>
                            경도 +
                        </button>
                        <button onClick={() => handleUserLocation(0, -0.0001)}>
                            경도 -
                        </button>
                    </div>
                    <button
                        onClick={() =>
                            handleMapCenter(
                                userLocation.latitude,
                                userLocation.longitude
                            )
                        }
                    >
                        마커 위치로 이동
                    </button>
                </ButtonContainer>

                <button onClick={() => navigate("/menuTest")}>
                    장바구니 테스트
                </button>
            </ButtonContainer>
        </div>
    );
};

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;
export default HomePage;
