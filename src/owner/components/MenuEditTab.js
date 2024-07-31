import { useState } from "react";
import styled from "styled-components";
import AddModal from "owner/components/AddModal";
import Button from "components/Common/Button";
import MenuItem from "components/Store/MenuItem";

const MenuEditTab = ({ item }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <>
            <ListContainer>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
                <div className="item-wrapper">
                    <MenuItem item={item} />
                </div>
            </ListContainer>
            {isAddModalOpen && (
                <AddModal
                    onClose={() => {
                        setIsAddModalOpen(false);
                    }}
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
    margin-top: -53px;
    margin-bottom: 100px;
    .item-wrapper {
        padding: 20px 20px 0px 20px;
        border-top: 1px solid ${({ theme }) => theme.color.gray100};
    }
`;
