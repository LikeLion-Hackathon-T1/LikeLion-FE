import styled from "styled-components";
import EditVisitItem from "./EditVisitItem";

const EditList = ({ visitList, handleSelect = () => {} }) => {
    return (
        <Wrapper>
            <ListContainer>
                {visitList.map((item, index) => (
                    <EditVisitItem
                        item={item}
                        key={index} // 추가된 부분: key prop
                        handleSelect={handleSelect}
                    />
                ))}
            </ListContainer>
        </Wrapper>
    );
};

export default EditList;

const Wrapper = styled.div`
    position: relative;
    height: 58dvh;
    padding-bottom: 90px;
`;

const ListContainer = styled.div`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap: 32px;
`;
