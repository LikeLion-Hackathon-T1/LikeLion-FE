import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Syluv } from "assets/images/syluv-small.svg";
import { useState } from "react";
import ButtonModal from "components/Common/ButtonModal";

const OwnerHeader = ({ name, stores }) => {
    const navigate = useNavigate();
    const storeData = stores || [];
    const [openModal, setOpenModal] = useState(false);

    const handleSelectStore = (storeId) => {
        navigate(`/owner/${storeId}`);
    };

    return (
        <>
            <Header>
                <div className="title">
                    <Syluv
                        cursor={"pointer"}
                        onClick={() => setOpenModal(true)}
                    />
                    {name}
                </div>
                <select
                    onChange={(e) => handleSelectStore(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>
                        가게 이동
                    </option>
                    {storeData.map((store) => (
                        <option key={store.storeId} value={store.storeId}>
                            {store.name}
                        </option>
                    ))}
                </select>
            </Header>
            {openModal && (
                <ButtonModal
                    title="일반 사용자 뷰 방문하기"
                    subText="홈으로 이동하시겠습니까?"
                    left="이동"
                    right="취소"
                    onLeftClick={() => navigate("/")}
                    onRightClick={() => setOpenModal(false)}
                />
            )}
        </>
    );
};

export default OwnerHeader;

const Header = styled.div`
    height: 52px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.gray900};

    .title {
        margin-left: 22px;
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        display: flex;
        align-items: center;
        gap: 12px;
    }

    select {
        margin-right: 22px;
        font-size: 16px;
        border: 1px solid ${({ theme }) => theme.color.gray300};
        border-radius: 10px;
        outline: none;
        width: 100px;
        height: 30px;
        padding: 0 10px;
    }
`;
