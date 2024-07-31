import styled from "styled-components";

const OwnerHeader = ({ name }) => {
    return (
        <Header>
            <div className="title">{name}</div>
        </Header>
    );
};

export default OwnerHeader;

const Header = styled.div`
    height: 52px;
    background-color: white;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.gray900};

    .title {
        margin-left: 22px;
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
`;
