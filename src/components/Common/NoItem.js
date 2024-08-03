import styled from "styled-components";
import noItem from "assets/images/no-cart.png";

const NoItem = () => {
    return (
        <NoItemContainer>
            <span className="title-text">리스트가 비어있어요</span>
            <img src={noItem} alt="no-item" width={158} height={158} />
            <span className="sub-text">
                시장을 구경하고
                <br />
                리스트를 채워주세요
            </span>
        </NoItemContainer>
    );
};

export default NoItem;

const NoItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    gap: 43px;

    .title-text {
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }

    .sub-text {
        font-size: 18px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        text-align: center;
        color: ${({ theme }) => theme.color.gray600};
    }
`;
