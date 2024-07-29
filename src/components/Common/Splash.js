import styled from "styled-components";
import { ReactComponent as SyluvLogo } from "assets/images/syluv-white.svg";

const Splash = () => {
    return (
        <Wrapper>
            <span>달콤한 시장 나들이,</span>
            <SyluvLogo />
        </Wrapper>
    );
};

export default Splash;

const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;

    background-color: ${({ theme }) => theme.color.primary};

    display: flex;
    flex-direction: column;

    gap: 19px;

    justify-content: center;
    align-items: center;

    span {
        font-size: 24px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: white;
    }
`;
