import { useState } from "react";
import styled from "styled-components";
import AddModal from "owner/components/AddModal";
import Button from "components/Common/Button";
import MenuItem from "components/Store/MenuItem";
import useSyluvAxios from "hooks/useSyluvAxios";
import Splash from "components/Common/Splash";
import Toast from "components/Common/Toast";

const MenuEditTab = ({ items, setItems, storeId }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const syluvAxios = useSyluvAxios();
    const [toastMessage, setToastMessage] = useState("");
    const closeToast = () => {
        setToastMessage("");
    };

    const handleAddItem = async (newItem) => {
        if (
            !newItem.name ||
            !newItem.price ||
            !newItem.content ||
            !newItem.serverImage
        ) {
            setToastMessage("올바르지 않은 메뉴 정보입니다.");
            return;
        }
        const formData = new FormData();
        const dto = {
            name: newItem.name,
            price: newItem.price,
            content: newItem.content,
        };

        formData.append(
            "dto",
            new Blob([JSON.stringify(dto)], { type: "application/json" })
        );

        formData.append("file", newItem.serverImage); // assuming newItem.file is a File object

        try {
            await syluvAxios.post(`/customer/${storeId}/addmenu`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setItems([...items, newItem]); // Assuming the API returns the new item
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    if (!items) {
        return <Splash />;
    }

    return (
        <>
            <ListContainer>
                <div className="item-wrapper">
                    {items.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </div>
            </ListContainer>
            {isAddModalOpen && (
                <AddModal
                    onClose={() => {
                        setIsAddModalOpen(false);
                    }}
                    onAdd={handleAddItem}
                />
            )}
            <ButtonContainer>
                <div className="position">
                    <Button
                        text="메뉴 추가"
                        type="2"
                        onClick={() => {
                            setIsAddModalOpen(true);
                        }}
                    />
                </div>
            </ButtonContainer>
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    message2="내용을 모두 입력해주세요."
                    onClose={closeToast}
                />
            )}
        </>
    );
};

export default MenuEditTab;

const ButtonContainer = styled.div`
    position: fixed;
    width: 440px;
    margin: 0 20px;
    bottom: 20px;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }
`;

const ListContainer = styled.div`
    margin-top: 104px;
    margin-bottom: 100px;
    .item-wrapper {
        padding: 20px 20px 0px 20px;
        border-top: 1px solid ${({ theme }) => theme.color.gray100};
    }
`;
