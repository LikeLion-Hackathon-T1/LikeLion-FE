import styled from "styled-components";
import VisitList from "./VisitList";
import { Map } from "react-kakao-maps-sdk";
import { useState } from "react";
import EditList from "./EditList";

const VisitTab = ({ visitList }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [selectedList, setSelectedList] = useState([]);

    const handleSelect = (id) => {
        if (selectedList.includes(id)) {
            setSelectedList(selectedList.filter((item) => item !== id));
        } else {
            setSelectedList([...selectedList, id]);
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
                    <span
                        className={`delete ${
                            selectedList.length === 0 && "disabled"
                        }`}
                        onClick={() => {
                            setIsEdit(!isEdit);
                        }}
                    >
                        삭제
                    </span>
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
    }
    .disabled {
        color: ${({ theme }) => theme.color.gray300};
        cursor: default;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -30px;
`;
