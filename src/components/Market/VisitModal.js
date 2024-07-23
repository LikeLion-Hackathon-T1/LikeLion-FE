import styled from "styled-components";

const VisitModal = ({ name, onCancle = () => {}, onConfirm = () => {} }) => {
    return (
        <Container>
            <Background onClick={onCancle} />
            <VisitModalContainer>
                <VisitTitle>{name}</VisitTitle>
                <VisitDesc>이 가게를 방문 리스트에 추가할까요?</VisitDesc>
                <ButtonContainer>
                    <Button onClick={onCancle}>아니요</Button>
                    <YesButton onClick={onConfirm}>네</YesButton>
                </ButtonContainer>
            </VisitModalContainer>
        </Container>
    );
};

export default VisitModal;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
`;

const VisitModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 218px;
    width: 440px;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 0 20px;
    z-index: 1001;
    @media (max-width: 480px) {
        width: calc(100vw - 40px);
    }
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    width: 480px;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const VisitTitle = styled.span`
    margin-top: 33px;
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.primary};
`;

const VisitDesc = styled.span`
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.gray700};
`;

const Button = styled.button`
    border: ${({ theme }) => `1px solid ${theme.color.primary}`};
    background-color: white;
    height: 48px;
    border-radius: 8px;
    width: 100%;
    color: ${({ theme }) => theme.color.primary};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const YesButton = styled(Button)`
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    gap: 18px;
    margin-bottom: 33px;
`;
