import styled from "styled-components";

const ButtonModal = ({
    title,
    subText = "",
    left,
    right,
    onRightClick = () => {},
    onLeftClick = () => {},
}) => {
    return (
        <>
            <Overlay />
            <ModalContainer>
                <div className="title-text">{title}</div>
                <div className="sub-text">{subText}</div>
                <div className="buttons">
                    {left && (
                        <ModalButton onClick={() => onLeftClick()}>
                            {left}
                        </ModalButton>
                    )}
                    {right && (
                        <ModalButton onClick={() => onRightClick()}>
                            {right}
                        </ModalButton>
                    )}
                </div>
            </ModalContainer>
        </>
    );
};

export default ButtonModal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
    z-index: 120; // Ensure it's below the modal but above other content
    width: 480px;
    @media (max-width: 480px) {
        width: 100dvw;
    }
`;

const ModalContainer = styled.div`
    min-width: 380px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 121;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .buttons {
        width: 100%;
        display: flex;
        gap: 12px;
    }

    font-size: 18px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};

    .title-text {
        font-size: 18px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: ${({ theme }) => theme.color.gray900};
        margin-bottom: 20px;
        text-align: center;
    }

    .sub-text {
        font-size: 20px;
        color: ${({ theme }) => theme.color.primary};
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        margin-bottom: 20px;
        text-align: center;
    }

    @media (max-width: 480px) {
        min-width: 80dvw;
    }
`;

const ModalButton = styled.button`
    flex: 1;
    background-color: #ff6b00;
    color: white;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    width: 143px;
    height: 46px;

    &:nth-child(1) {
        background-color: white;
        color: #ff6b00;
        border: 1px solid #ff6b00;
    }
`;
