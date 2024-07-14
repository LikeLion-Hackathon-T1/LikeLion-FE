// App.js
import React from "react";
import styled from "styled-components";

const App = () => {
    return (
        <Container>
            <MobileContainer></MobileContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
`;

const MobileContainer = styled.div`
    width: 480px;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;
`;

export default App;
