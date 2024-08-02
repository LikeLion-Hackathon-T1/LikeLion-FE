import styled from "styled-components";
import TotalVisitItem from "./TotalVisitItem";

const TotalVisitList = ({ date, visitList }) => {
    return (
        <Wrapper>
            <div className="date">{date}</div>
            <div className="store">광장시장</div>
            {visitList.map((visit) => (
                <TotalVisitItem
                    key={visit.id}
                    item={visit}
                    isLast={visitList.indexOf(visit) === visitList.length - 1}
                    index={visitList.indexOf(visit)}
                />
            ))}
        </Wrapper>
    );
};

export default TotalVisitList;

const Wrapper = styled.div`
    margin-bottom: 40px;

    .date {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
        margin-bottom: 24px;
    }

    .store {
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
        margin-bottom: 16px;
    }
`;
