import styled from "styled-components";
import VisitItem from "./VisitItem";
import { useState } from "react";

const VisitList = ({ visitList }) => {
    const [openedModal, setOpenedModal] = useState(null);
    const handleOpenModal = (id) => {
        setOpenedModal(id);
    };

    return (
        <ListContainer>
            {visitList.map((item, index) => (
                <Container>
                    <VisitItem
                        item={item}
                        index={index}
                        isLast={index === visitList.length - 1}
                        key={index} // 추가된 부분: key prop
                        openId={openedModal}
                        handleOpenModal={handleOpenModal}
                    />
                </Container>
            ))}
        </ListContainer>
    );
};

export default VisitList;

const Container = styled.div`
    position: relative;
`;

const ListContainer = styled.div`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    .visit-complete {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: ${({ theme }) => theme.color.primary};
        border: 1px solid ${({ theme }) => theme.color.primary};
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        font-size: 12px;
        padding: 6px 8px;
        border-radius: 5px;
    }
`;
