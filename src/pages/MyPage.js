import Header from "components/Common/Header";
import TabBar from "components/Common/TabBar";
import styled from "styled-components";
import { ReactComponent as Kakao } from "assets/images/kakao-small.svg";
import useTokenStore from "hooks/useTokenStore";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const MyPage = () => {
    const navigate = useNavigate();
    const syluvAxios = useSyluvAxios();
    const { setAccessToken, setRefreshToken, getName } = useTokenStore();
    const [userInfo, setUserInfo] = useState({});
    const handleLogout = () => {
        setAccessToken("");
        setRefreshToken("");
        navigate("/login");
    };
    const handleExit = () => {
        syluvAxios
            .delete("/users/logout", {
                params: {
                    nickname: getName(),
                },
            })
            .finally(() => {
                setAccessToken("");
                setRefreshToken("");
                navigate("/login");
            });
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await syluvAxios.get("/users/mypage");
                setUserInfo(res.data.payload);
            } catch (error) {
                console.error(error);
            }
        };
        getUserInfo();
    }, []);

    return (
        <>
            <Header title="마이페이지" back={false} cart={false} />
            <Wrapper>
                <div className="profile">
                    <img src={userInfo.picture} alt="profile" />
                    <div className="profile-body">
                        <span>{userInfo.name}</span>
                        <div className="email">
                            <Kakao />
                            <span>{userInfo.email}</span>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div>
                        <span className="menu-title">약관 및 개정</span>
                        <Line />
                        <span>이용약관</span>
                        <Line />
                        <span>개인정보 처리방침</span>
                        <Line />
                    </div>
                    <div>
                        <span className="menu-title">계정</span>
                        <Line />
                        <span
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            로그아웃
                        </span>
                        <Line />
                        <span
                            onClick={() => {
                                handleExit();
                            }}
                            className="exit"
                        >
                            탈퇴하기
                        </span>
                    </div>
                </div>
            </Wrapper>
            <TabBar activeTab={"mypage"} />
        </>
    );
};

export default MyPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 44px;

    .profile {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: 20px;

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        .profile-body {
            display: flex;
            flex-direction: column;
            gap: 8px;

            span {
                font-size: 20px;
                font-weight: ${({ theme }) => theme.fontWeight.semiBold};
                color: ${({ theme }) => theme.color.gray900};
            }
        }

        .email {
            display: flex;
            gap: 4px;
            span {
                font-size: 14px;
                font-weight: ${({ theme }) => theme.fontWeight.regular};
                color: ${({ theme }) => theme.color.gray500};
            }
        }
    }
    .menu {
        display: flex;
        flex-direction: column;
        gap: 36px;

        font-size: 16px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        color: ${({ theme }) => theme.color.gray900};

        span {
            margin-left: 20px;
            cursor: pointer;
        }

        .menu-title {
            color: ${({ theme }) => theme.color.gray500};
            cursor: default;
        }

        .exit {
            color: ${({ theme }) => theme.color.gray300};
            font-size: 15px;
        }
    }
`;

const Line = styled.hr`
    border: 0.5px solid ${({ theme }) => theme.color.gray100};
    margin: 20px 0px;
`;
