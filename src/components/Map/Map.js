import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import SyluvIcon from "assets/images/syluv.png";
import styled from "styled-components";

const KakaoMap = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);
    const [waypoints, setWaypoints] = useState([]);

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

    const handleAddWaypoint = () => {
        if (userLocation) {
            setWaypoints([
                ...waypoints,
                { lat: userLocation.latitude, lng: userLocation.longitude },
            ]);
        }
    };

    return (
        <Container>
            {
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심 위치
                        lat: mapCenter?.latitude || 37.631879,
                        lng: mapCenter?.longitude || 127.077409,
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
                    {waypoints.map((waypoint, index) => (
                        <MapMarker
                            key={index}
                            position={{
                                lat: waypoint.lat,
                                lng: waypoint.lng,
                            }}
                            image={{
                                src: SyluvIcon,
                                size: { width: 30, height: 30 },
                            }}
                        />
                    ))}
                    {waypoints.length > 1 && (
                        <Polyline
                            path={[waypoints]}
                            strokeWeight={5} // 선의 두께 입니다
                            strokeColor={"#FFAE00"} // 선의 색깔입니다
                            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                            strokeStyle={"solid"} // 선의 스타일입니다
                        />
                    )}
                </Map>
            }
            {userLocation && (
                <ButtonContainer>
                    <button onClick={() => getUserLocation()}>
                        내 위치 찾기
                    </button>
                    <Button>
                        <button onClick={() => handleUserLocation(0.0001, 0)}>
                            위도 +
                        </button>
                        <div>
                            <button
                                onClick={() => handleUserLocation(0, -0.0001)}
                            >
                                경도 -
                            </button>
                            <button
                                onClick={() => handleUserLocation(0, 0.0001)}
                            >
                                경도 +
                            </button>
                        </div>
                        <button onClick={() => handleUserLocation(-0.0001, 0)}>
                            위도 -
                        </button>
                    </Button>
                    <button onClick={() => handleAddWaypoint()}>
                        마커 위치 경유지로 등록
                    </button>
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
                    <button onClick={() => setWaypoints([])}>
                        경유지 초기화
                    </button>
                </ButtonContainer>
            )}
        </Container>
    );
};

const Container = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const Button = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

export default KakaoMap;
