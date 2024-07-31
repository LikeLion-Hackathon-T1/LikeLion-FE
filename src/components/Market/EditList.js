import styled from "styled-components";
import EditVisitItem from "./EditVisitItem";

const EditList = ({ visitList, handleSelect = () => {} }) => {
    const filteredVisitList = visitList.filter(
        (item) => item.status === "BEFORE"
    );
    return (
        <Wrapper>
            <ListContainer>
                {filteredVisitList.map((item, index) => (
                    <EditVisitItem
                        item={item}
                        key={index} // 추가된 부분: key prop
                        handleSelect={handleSelect}
                    />
                ))}
            </ListContainer>
            <Infomation>방문 전인 가게만 삭제할 수 있어요</Infomation>
        </Wrapper>
    );
};

export default EditList;

const Wrapper = styled.div`
    position: relative;
    height: 58dvh;
    padding-bottom: 90px;
`;

const Infomation = styled.div`
    position: fixed;
    width: 440px;
    margin-bottom: 20px;
    margin-left: 20px;
    height: 43px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.color.gray400};
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    color: white;
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    @media (max-width: 480px) {
        width: calc(100vw - 40px);
    }
`;

const ListContainer = styled.div`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap: 32px;
`;
