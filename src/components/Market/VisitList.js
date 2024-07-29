import styled from "styled-components";
import VisitItem from "./VisitItem";

const VisitList = ({ visitList }) => {
    return (
        <ListContainer>
            {visitList.map((item, index) => (
                <VisitItem
                    item={item}
                    index={index}
                    isLast={index === visitList.length - 1}
                    key={index} // 추가된 부분: key prop
                />
            ))}
        </ListContainer>
    );
};

export default VisitList;

const ListContainer = styled.div`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;
