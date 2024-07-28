import styled from "styled-components";

const Button = ({ text, type = "1", onClick = () => {} }) => {
    return (
        <>
            {type === "1" ? (
                <ButtonStyle1 onClick={onClick}>{text}</ButtonStyle1>
            ) : (
                <ButtonStyle2 onClick={onClick}>{text}</ButtonStyle2>
            )}
        </>
    );
};

export default Button;

const ButtonStyle1 = styled.button`
    border: ${({ theme }) => `1px solid ${theme.color.primary}`};
    background-color: white;
    height: 48px;
    border-radius: 8px;
    width: 100%;
    color: ${({ theme }) => theme.color.primary};
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    cursor: pointer;

    // 호버시 살짝 커지고 살짝 밝아지고
    &:hover {
        transform: scale(1.01);
        transition: transform 0.2s;

        filter: brightness(1.02);
    }
`;

const ButtonStyle2 = styled(ButtonStyle1)`
    color: white;
    background-color: ${({ theme }) => theme.color.primary};
`;
