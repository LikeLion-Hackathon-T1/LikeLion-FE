import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonModal from "components/Common/ButtonModal";
import { ReactComponent as ReloadIcon } from "assets/images/reload.svg";

const OwnerHeader = ({ name, stores }) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const storeData = stores || [];

    const handleSelectStore = (storeId) => {
        navigate(`/owner/${storeId}`);
    };

    console.log("hi");
    console.log(name);

    return (
        <>
            {isClicked && (
                <ButtonModal
                    title="계정 유형 전환"
                    subText="방문객 계정으로 전환하시겠습니까?"
                    left="이동"
                    right="취소"
                    onLeftClick={() => {
                        navigate("/");
                    }}
                    onRightClick={() => {
                        setIsClicked(false);
                    }}
                />
            )}
            <Header>
                <Selecter
                    onChange={(e) => handleSelectStore(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>
                        {name ? name : "가게를 선택해주세요."}
                    </option>
                    {storeData.map((store) => (
                        <option key={store.storeId} value={store.storeId}>
                            {store.name}
                        </option>
                    ))}
                </Selecter>
                <Reload
                    onClick={() => {
                        setIsClicked(true);
                    }}
                >
                    <ReloadIcon alt="reload" />
                </Reload>
            </Header>
        </>
    );
};

export default OwnerHeader;

const Selecter = styled.select`
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 10px;
    margin-left: 20px;
    option {
        border: none;
    }
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    appearance: none;

    background-color: white;
`;

const Header = styled.div`
    height: 52px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.gray900};

    .title {
        margin-left: 22px;
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        display: flex;
        align-items: center;
        gap: 12px;
    }
`;

const Reload = styled.div`
    margin-right: 20px;

    background-color: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    // 마우스 호버시 앞위로 뒤집히는 효과
    transition: transform 0.3s;
    &:hover {
        transform: rotate(180deg);
    }
`;
