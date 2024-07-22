import styled from "styled-components";

const TabBar = () => {
    return <Container>탭바</Container>;
};

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    width: 480px;
    height: 62px;
    @media (max-width: 480px) {
        width: 100dvw;
    }
`;

export default TabBar;
