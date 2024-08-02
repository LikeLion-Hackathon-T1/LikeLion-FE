import Header from "components/Common/Header";
import styled from "styled-components";
import { ReactComponent as Toss } from "assets/images/toss.svg";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Warn } from "assets/images/warning.svg";

const OrderPage = ({ item, onClick = () => {} }) => {
    const navigate = useNavigate();

    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [isDelivery, setIsDelivery] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const handlePhoneChange = useCallback((e) => {
        const value = e.target.value.replace(/\D/g, "");
        let formattedValue = "";

        if (value.length <= 3) {
            formattedValue = value;
        } else if (value.length <= 7) {
            formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}`;
        } else {
            formattedValue = `${value.slice(0, 3)}-${value.slice(
                3,
                7
            )}-${value.slice(7, 11)}`;
        }

        setPhone(formattedValue);
    }, []);

    const handleHourChange = useCallback((e) => {
        // 최대 2자리 숫자만 입력 가능, 24시 이상 입력 불가
        let value = e.target.value.replace(/\D/g, "");
        if (value === "") {
            setHour("");
            setError(false);
        } else if (value.length <= 2 && parseInt(value) < 24) {
            setHour(value);
            setError(false);
        } else {
            setError(true);
            setMessage("24시 이상 입력할 수 없습니다.");
        }
    }, []);

    const handleMinuteChange = useCallback((e) => {
        // 최대 2자리 숫자만 입력 가능, 60분 이상 입력 불가
        let value = e.target.value.replace(/\D/g, "");
        if (value === "") {
            setMinute("");
            setError(false);
        } else if (value.length <= 2 && parseInt(value) < 60) {
            setMinute(value);
            setError(false);
        } else {
            setError(true);
            setMessage("60분 이상 입력할 수 없습니다.");
        }
    }, []);

    useEffect(() => {
        //hour, minute이 한 자리 이상이고 현재 시간보다 전인 경우
        if (hour.length > 0 && minute.length > 0) {
            const now = new Date();
            const nowHour = now.getHours();
            const nowMinute = now.getMinutes();
            const selectedHour = parseInt(hour);
            const selectedMinute = parseInt(minute);

            if (
                selectedHour < nowHour ||
                (selectedHour === nowHour && selectedMinute < nowMinute)
            ) {
                setError(true);
                setMessage("현재 시간 이후로 선택해주세요.");
            } else {
                setError(false);
            }
        }
    }, [hour, minute]);

    useEffect(() => {
        //hour, minute이 한 자리 이상
        //phone이 10자리 이상 = > isReady = true
        if (hour.length > 0 && minute.length > 0 && phone.length >= 13) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [hour, minute, phone]);

    return (
        <>
            <Header title="주문하기" cart={false} />
            <Container>
                <div className="section">
                    <span className="title-text">수령 방식</span>
                    <div className="buttons">
                        <button
                            className={`${isDelivery ? "" : "click"}`}
                            onClick={() => {
                                setIsDelivery(false);
                            }}
                        >
                            바로 이용하기
                        </button>
                        <button
                            className={`${!isDelivery ? "" : "click"}`}
                            onClick={() => {
                                setIsDelivery(true);
                            }}
                        >
                            픽업하기
                        </button>
                    </div>
                </div>
                <div className="section">
                    <span className="title-text">방문할 시각</span>
                    <div className={`time ${error ? "error" : ""}`}>
                        <input
                            placeholder="00"
                            value={hour}
                            onChange={(e) => handleHourChange(e)}
                        />
                        <span>시</span>
                        <input
                            placeholder="00"
                            value={minute}
                            onChange={(e) => handleMinuteChange(e)}
                        />
                        <span>분</span>
                    </div>
                    {error && (
                        <div className="error-message">
                            <Warn />
                            <span>{message}</span>
                        </div>
                    )}
                </div>
                <div className="section">
                    <span className="title-text">연락처</span>
                    <input
                        className="call"
                        placeholder="휴대폰 번호를 입력해주세요"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength="13"
                    />
                </div>
                <div className="section">
                    <span className="title-text">결제 수단</span>
                    <button>
                        <span>토스페이로 결제하기</span>
                        <Toss />
                    </button>
                </div>
            </Container>
            <ButtonContainer>
                <OrderButton
                    onClick={() => {
                        navigate("/ordersuccess");
                    }}
                    error={!isReady}
                >
                    {new Intl.NumberFormat("ko-KR").format(51000)}원 결제하기
                </OrderButton>
            </ButtonContainer>
        </>
    );
};

const Container = styled.div`
    margin-top: -60px;
    width: 100%;
    margin-bottom: 80px;

    .section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 28px 20px;
        border-bottom: 1px solid ${({ theme }) => theme.color.gray100};

        .error-message {
            display: flex;
            gap: 4px;
            color: #ff3b30;
            font-size: 14px;
            font-weight: ${({ theme }) => theme.fontWeight.regular};
            align-items: center;
        }

        .call {
            height: 48px;
            border-radius: 8px;
            border: 1px solid ${({ theme }) => theme.color.gray200};
            outline: none;
            padding: 0px 16px;
            font-size: 16px;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            color: ${({ theme }) => theme.color.gray900};

            &::placeholder {
                color: ${({ theme }) => theme.color.gray500};
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;

            button {
                width: 100%;
                height: 48px;
                background-color: white;
                text-align: left;
                padding: 0px 16px;
                border: 1px solid ${({ theme }) => theme.color.gray200};
                border-radius: 8px;
                cursor: pointer;

                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.medium};
                color: ${({ theme }) => theme.color.gray600};
            }

            .click {
                color: ${({ theme }) => theme.color.primary};
                border: 1px solid ${({ theme }) => theme.color.primary};
                background-color: rgba(255, 107, 0, 0.04);
                box-shadow: 0px 4px 12px rgba(248, 63, 105, 0.08);
            }
        }

        .time {
            input {
                width: 64px;
                height: 48px;
                border-radius: 8px;
                border: 1px solid ${({ theme }) => theme.color.gray200};
                outline: none;
                text-align: center;
                color: ${({ theme }) => theme.color.gray900};

                font-size: 16px;

                &::placeholder {
                    color: ${({ theme }) => theme.color.gray500};
                }
            }
            span {
                margin-left: 10px;
                margin-right: 16px;
            }
        }

        .error {
            input {
                border: 1px solid #ff3b30;
                color: #ff3b30;
            }
        }

        button {
            height: 154px;
            border: 1px solid ${({ theme }) => theme.color.gray200};
            border-radius: 8px;
            background-color: ${({ theme }) => theme.color.gray50};

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 12px;
            span {
                font-size: 18px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                color: ${({ theme }) => theme.color.gray900};
            }
        }
    }

    .title-text {
        font-size: 18px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray900};
    }
`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0px;
    padding: 20px 0px;
    background-color: white;
    border-top: 1px solid ${({ theme }) => theme.color.gray100};
`;

const OrderButton = styled.button`
    width: 440px;
    height: 48px;
    margin: 0px 20px;
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    border: none;
    border-radius: 8px;
    cursor: pointer;

    ${({ error }) =>
        error &&
        `
        background-color: #b3b3b3;
        cursor: not-allowed;
    `}

    @media (max-width: 480px) {
        width: calc(100dvw - 40px);
    }
`;
export default OrderPage;
