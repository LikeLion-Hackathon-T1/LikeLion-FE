import styled from "styled-components";
import VisitList from "./VisitList";
import { CustomOverlayMap, Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import { useCallback, useEffect, useState } from "react";
import EditList from "./EditList";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useGeoLocation } from "hooks/useGeoLocation";
import Splash from "components/Common/Splash";
import NoItem from "components/Common/NoItem";

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000 * 3600 * 24,
};

const VisitTab = ({
    visitList,
    handleVisitList = () => {},
    onChange = () => {},
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const syluvAxios = useSyluvAxios();
    const [mapCenter, setMapCenter] = useState({
        latitude: null,
        longitude: null,
        level: 3,
    });
    const { location, error } = useGeoLocation(geolocationOptions);

    useEffect(() => {
        if (visitList.length > 0) {
            setMapCenter({
                latitude: visitList[0]?.latitude,
                longitude: visitList[0]?.longitude,
            });
        } else {
            setMapCenter({
                latitude: location?.latitude,
                longitude: location?.longitude,
            });
        }
    }, [visitList, location]);

    const handleSelect = (id) => {
        if (selectedList.includes(id)) {
            setSelectedList(selectedList.filter((item) => item !== id));
        } else {
            setSelectedList([...selectedList, id]);
        }
    };

    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedList.map((visitListId) =>
                    syluvAxios.delete(`/market/${visitListId}/visitlist/delete`)
                )
            );

            onChange();

            handleVisitList({
                changedList: visitList.filter(
                    (item) => !selectedList.includes(item.visitListId)
                ),
            });

            setSelectedList([]);
            setIsEdit(!isEdit);
        } catch (error) {
            console.error("방문 리스트 삭제 중 에러가 발생했습니다:", error);
        }
    };

    const moveCenter = useCallback((latitude, longitude) => {
        setMapCenter({
            latitude,
            longitude,
            level: 1,
        });

        // 스크롤 이동
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const createMarkerSvg = (number) => {
        const svg = `
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0004 6.10574e-05C14.0004 2.73363e-05 14.0004 -1.53905e-10 14.0004 0C10.497 1.59895e-05 1.85211 1.44229 0.203032 11.0187C-1.50849 20.9578 8.00339 27.7301 13.614 31.7248C13.7446 31.8178 13.8731 31.9093 13.9993 31.9993C13.9994 31.9994 13.9994 31.9995 13.9994 31.9996V31.9997C13.9994 31.9999 13.9997 32.0001 13.9998 31.9999C13.9999 31.9999 13.9999 31.9999 13.9999 31.9999C14 31.9998 14.0001 31.9998 14.0001 31.9999C14.0002 32 14.0004 31.9999 14.0004 31.9997V31.9996C14.0004 31.9996 14.0005 31.9995 14.0005 31.9994C14.1267 31.9095 14.2552 31.818 14.3858 31.725C19.9965 27.7303 29.5083 20.9579 27.7968 11.0188C26.1479 1.44334 17.5045 0.000415547 14.0005 0.000122115C14.0005 0.000122112 14.0004 9.47767e-05 14.0004 6.10574e-05Z" fill="#FF6B00"/>
            <rect x="4" y="3" width="20" height="20" rx="10" fill="white"/>
            <text x="14" y="15" text-anchor="middle" fill="#FF6B00" font-size="15" font-family="Pretendard" font-weight="900" dy=".3em">${number}</text>
          </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    const MapMarkerWithCustomeOverlay = ({ lat, lng, number, content }) => {
        const map = useMap();
        const [isVisible, setIsVisible] = useState(false);

        return (
            <>
                <MapMarker
                    position={{
                        lat,
                        lng,
                    }}
                    onClick={(marker) => map.panTo(marker.getPosition())}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                    image={{
                        src: createMarkerSvg(number),
                        size: { width: 28, height: 32 },
                        alt: "마커 이미지",
                    }}
                />
                {isVisible && (
                    <CustomOverlayMap
                        position={{
                            lat,
                            lng,
                        }}
                        yAnchor={0}
                    >
                        <WindowContainer>{content}</WindowContainer>
                    </CustomOverlayMap>
                )}
            </>
        );
    };

    if (mapCenter.latitude === undefined || mapCenter.longitude === undefined) {
        return <Splash />;
    }

    return (
        <Container>
            <Map
                style={{
                    width: "100%",
                    height: "420px",
                }}
                center={{
                    lat: mapCenter.latitude,
                    lng: mapCenter.longitude,
                }}
                isPanto={true}
                level={mapCenter.level}
            >
                {/* 내 위치 마커 */}
                {/* <MapMarker
                    position={{
                        lat: location?.latitude,
                        lng: location?.longitude,
                    }}
                /> */}

                {visitList.map((item) => (
                    <MapMarkerWithCustomeOverlay
                        key={item.visitListId}
                        lat={item.latitude}
                        lng={item.longitude}
                        number={visitList.indexOf(item) + 1}
                        content={item.store}
                    />
                ))}
            </Map>
            {visitList.length > 0 ? (
                <BodyContainer>
                    <NavBar>
                        <span className="text-title">오늘의 방문 리스트</span>
                        {isEdit ? (
                            selectedList.length > 0 ? (
                                <span className="delete" onClick={handleDelete}>
                                    삭제
                                </span>
                            ) : (
                                <span
                                    className="disabled"
                                    onClick={() => setIsEdit(false)}
                                >
                                    취소
                                </span>
                            )
                        ) : (
                            <span
                                className="edit"
                                onClick={() => setIsEdit(true)}
                            >
                                편집
                            </span>
                        )}
                    </NavBar>
                    {isEdit ? (
                        <EditList
                            visitList={visitList}
                            handleSelect={handleSelect}
                        />
                    ) : (
                        <VisitList
                            visitList={visitList}
                            onClickItem={moveCenter}
                        />
                    )}
                </BodyContainer>
            ) : (
                <ItemContainer>
                    <NoItem />
                </ItemContainer>
            )}
        </Container>
    );
};

export default VisitTab;

const ItemContainer = styled.div`
    margin-top: 20px;
`;

const NavBar = styled.div`
    margin: 25px;
    display: flex;
    justify-content: space-between;

    .text-title {
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
    }

    .edit {
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        color: ${({ theme }) => theme.color.gray500};
        cursor: pointer;
    }
    .delete {
        color: ${({ theme }) => theme.color.primary};
        cursor: pointer;
    }
    .disabled {
        color: ${({ theme }) => theme.color.gray300};
        cursor: pointer;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100dvh;
`;

const BodyContainer = styled.div`
    overflow-y: auto;
`;

const WindowContainer = styled.div`
    border: 2px solid ${({ theme }) => theme.color.primary};
    background-color: white;
    padding: 4px 10px;
    margin-top: 2px;
    border-radius: 10px;

    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    color: ${({ theme }) => theme.color.primary};
`;
