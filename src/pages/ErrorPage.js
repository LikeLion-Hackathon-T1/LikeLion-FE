import ButtonModal from "components/Common/ButtonModal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <ButtonModal
                title="문제가 발생했습니다"
                subText="서비스 개선을 위해 노력하겠습니다"
                left="홈으로"
                right="피드백하기"
                onLeftClick={() => navigate("/", { replace: true })}
                onRightClick={() => navigate("/feedback", { replace: true })}
            />
        </Wrapper>
    );
};

export default ErrorPage;

const Wrapper = styled.div`
    height: 100dvh;
    width: 480px;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
        width: 100dvw;
    }
`;
