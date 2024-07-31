import React, { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as AlertIcon } from "assets/images/alert.svg";

const Toast = ({ message, message2, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <ToastMessage>
            <AlertIcon />
            <div>
                {message}
                <br />
                {message2}
            </div>
        </ToastMessage>
    );
};

const ToastMessage = styled.div`
    position: fixed;
    height: 72px;
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 110px;

    width: 335px;

    left: 50%;
    transform: translateX(-50%);

    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;

    padding-left: 16px;

    border-radius: 8px;

    @media (max-width: 480px) {
        width: calc(100% - 40px);
    }

    div {
        color: white;
        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        line-height: 24px;
    }
`;

export default Toast;
