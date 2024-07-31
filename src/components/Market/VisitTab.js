import styled from "styled-components";
import VisitList from "./VisitList";
import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import EditList from "./EditList";
import useSyluvAxios from "hooks/useSyluvAxios";

const VisitTab = ({ visitList, onChange = () => {} }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const syluvAxios = useSyluvAxios();

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
                selectedList.map((id) =>
                    syluvAxios.delete(`/market/${id}/visitlist/delete`)
                )
            );
            console.log("방문 리스트 삭제 성공");

            setSelectedList([]);
            onChange(selectedList);
            setIsEdit(!isEdit);
        } catch (error) {
            console.error("방문 리스트 삭제 중 에러가 발생했습니다:", error);
        }
    };

    return (
        <Container>
            <Map
                style={{
                    width: "100%",
                    height: "224px",
                }}
                center={{
                    lat: 37.5665,
                    lng: 126.978,
                }}
                level={3}
            />
            <NavBar>
                <span className="text-title">오늘의 방문 리스트</span>
                {isEdit ? (
                    selectedList.length > 0 ? (
                        <span
                            className="delete"
                            onClick={() => {
                                handleDelete();
                            }}
                        >
                            삭제
                        </span>
                    ) : (
                        <span
                            className="disabled"
                            onClick={() => {
                                setIsEdit(!isEdit);
                            }}
                        >
                            취소
                        </span>
                    )
                ) : (
                    <span
                        className="edit"
                        onClick={() => {
                            setIsEdit(!isEdit);
                        }}
                    >
                        편집
                    </span>
                )}
            </NavBar>
            {isEdit ? (
                <EditList visitList={visitList} handleSelect={handleSelect} />
            ) : (
                <VisitList visitList={visitList} />
            )}
        </Container>
    );
};

export default VisitTab;

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
    margin-top: -30px;
`;
