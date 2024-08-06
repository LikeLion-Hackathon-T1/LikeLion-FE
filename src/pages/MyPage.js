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
    const [currentTab, setCurrentTab] = useState("마이페이지");
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
            <Header
                title={currentTab}
                back={currentTab !== "마이페이지"}
                cart={false}
                onLeftClick={() => setCurrentTab("마이페이지")}
            />
            {currentTab === "마이페이지" ? (
                <>
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
                                <span
                                    onClick={() => {
                                        setCurrentTab("이용약관");
                                    }}
                                >
                                    이용약관
                                </span>
                                <Line />
                                <span
                                    onClick={() => {
                                        setCurrentTab("개인정보 처리방침");
                                    }}
                                >
                                    개인정보 처리방침
                                </span>
                                <Line />
                            </div>
                            <div>
                                <span className="menu-title">계정</span>
                                <Line />
                                <span
                                    onClick={() => {
                                        navigate("/owner");
                                    }}
                                >
                                    상인 계정 전환
                                </span>
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
            ) : currentTab === "이용약관" ? (
                <Terms>
                    <div className="term">
                        <span className="title-text">제 1조 (목적)</span>
                        <span className="body-text">
                            이 약관은 [syluv] 웹앱 서비스(이하 "서비스"라
                            합니다)를 이용함에 있어 회사와 이용자의 권리, 의무
                            및 책임사항을 규정함을 목적으로 합니다.
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">제 2 조 (정의)</span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    "서비스"란 [syluv]이 제공하는 온라인
                                    플랫폼을 통해 음식이나 제품을 구매할 수 있는
                                    서비스를 말합니다.
                                </li>
                                <li>
                                    "이용자"란 본 약관에 따라 회사가 제공하는
                                    서비스를 이용하는 자를 말합니다.
                                </li>
                                <li>
                                    "회원"이란 서비스에 개인정보를 제공하여
                                    회원등록을 한 자로서, 서비스를 지속적으로
                                    이용할 수 있는 자를 말합니다.{" "}
                                </li>
                                <li>
                                    "비회원"이란 회원에 가입하지 않고 서비스를
                                    이용하는 자를 말합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 3 조 (약관의 명시와 개정)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 본 약관의 내용을 이용자가 쉽게 알 수
                                    있도록 서비스 초기 화면에 게시합니다.
                                </li>
                                <li>
                                    회사는 필요하다고 인정되는 경우 관련 법령을
                                    위배하지 않는 범위에서 본 약관을 개정할 수
                                    있습니다.
                                </li>
                                <li>
                                    개정된 약관은 적용일자 및 개정사유를
                                    명시하여 공지하며, 개정약관의 적용일자
                                    이전에 이용자가 이의 제기를 하지 않으면
                                    개정된 약관에 동의한 것으로 간주합니다.
                                </li>
                                <li>
                                    "비회원"이란 회원에 가입하지 않고 서비스를
                                    이용하는 자를 말합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 4 조 (서비스의 제공 및 변경)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 다음과 같은 서비스를 제공합니다:
                                    <ul>
                                        <li>음식 및 제품 구매 서비스 </li>
                                        <li>기타 회사가 정하는 서비스</li>
                                    </ul>
                                </li>
                                <li>
                                    회사는 서비스의 내용 및 제공일자를 변경할 수
                                    있으며, 이 경우 변경된 서비스의 내용 및
                                    제공일자를 명시하여 공지합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 5 조 (서비스의 중단)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 정기점검 또는 기술상의 이유로
                                    서비스의 제공을 일시적으로 중단할 수 있으며,
                                    이 경우 사전에 공지합니다.
                                </li>
                                <li>
                                    회사는 천재지변, 전쟁, 기타 불가항력적
                                    사유가 발생한 경우 사전 공지 없이 서비스의
                                    제공을 중단할 수 있습니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">제 6 조 (회원가입)</span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    이용자는 회사가 정한 절차에 따라 회원가입을
                                    신청합니다.
                                </li>
                                <li>
                                    회사는 다음 각 호에 해당하는 회원가입 신청에
                                    대해 승낙하지 않을 수 있습니다:
                                    <ul>
                                        <li>
                                            등록 내용에 허위, 기재 누락, 오기가
                                            있는 경우
                                        </li>
                                        <li>
                                            기타 회원으로 등록하는 것이 회사의
                                            기술상 현저히 지장이 있다고 판단되는
                                            경우
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 7 조 (회원 탈퇴 및 자격 상실 등)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회원은 언제든지 탈퇴를 요청할 수 있으며,
                                    회사는 즉시 회원탈퇴를 처리합니다.
                                </li>
                                <li>
                                    회사는 다음 각 호의 사유가 발생한 경우 회원
                                    자격을 제한 또는 상실시킬 수 있습니다:
                                    <ul>
                                        <li>
                                            가입 신청 시 허위 내용을 등록한 경우
                                        </li>
                                        <li>
                                            다른 이용자의 서비스 이용을
                                            방해하거나 정보를 도용하는 등
                                            전자상거래 질서를 위협하는 경우
                                        </li>
                                        <li>
                                            기타 관련 법령이나 회사가 정한
                                            이용약관을 위반한 경우
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 8 조 (이용자의 의무)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    이용자는 서비스 이용 시 다음 행위를 하여서는
                                    안 됩니다:
                                    <ul>
                                        <li>허위 내용의 등록</li>
                                        <li>
                                            타인의 정보 도용 회사의 저작권 등
                                            지적재산권 침해
                                        </li>
                                        <li>기타 불법적이거나 부당한 행위</li>
                                    </ul>
                                </li>
                                <li>
                                    이용자는 본 약관 및 관련 법령을 준수하여야
                                    합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 9 조 (회사의 의무)
                        </span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 관련 법령과 본 약관이 금지하거나
                                    반하는 행위를 하지 않으며, 지속적이고
                                    안정적으로 서비스를 제공하기 위해 최선을
                                    다합니다.
                                </li>
                                <li>
                                    회사는 이용자로부터 제기되는 의견이나 불만이
                                    정당하다고 인정될 경우 신속히 처리합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">제 10 조 (손해배상)</span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 무료로 제공되는 서비스와 관련하여
                                    이용자에게 발생한 손해에 대하여 책임을 지지
                                    않습니다.
                                </li>
                                <li>
                                    유료 서비스의 경우, 회사는 고의 또는 중대한
                                    과실로 이용자에게 손해를 끼친 경우 책임을
                                    부담합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">제 11 조 (면책 조항)</span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사는 천재지변, 전쟁, 기타 불가항력적
                                    사유로 인해 서비스를 제공할 수 없는 경우
                                    책임을 지지 않습니다.
                                </li>
                                <li>
                                    회사는 이용자의 귀책사유로 인해 발생한
                                    서비스 이용의 장애에 대하여 책임을 지지
                                    않습니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">제 12 조 (분쟁 해결)</span>
                        <span className="body-text">
                            <ol>
                                <li>
                                    회사와 이용자 간에 발생한 분쟁에 대하여는
                                    대한민국 법을 준거법으로 합니다.
                                </li>
                                <li>
                                    본 약관과 관련된 분쟁은 회사의 본사 소재지를
                                    관할하는 법원을 제1심 관할법원으로 합니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                </Terms>
            ) : (
                <Terms>
                    <div className="term">
                        <span className="title-text">제 1 조 (목적)</span>
                        <span className="body-text">
                            [syluv] 웹앱 서비스(이하 "회사"라 합니다)는 이용자의
                            개인정보를 중요시하며, "개인정보 보호법"을 준수하고
                            있습니다. 본 개인정보처리방침은 이용자가 제공하는
                            개인정보가 어떻게 이용되고 있으며, 개인정보 보호를
                            위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 2 조 (수집하는 개인정보 항목)
                        </span>
                        <span className="body-text">
                            회사는 다음과 같은 개인정보를 수집하고 있습니다:
                            <ol>
                                <li>
                                    회원가입 시:
                                    <ul>
                                        <li>
                                            필수항목: 이름, 이메일 주소,
                                            비밀번호, 휴대폰 번호
                                        </li>
                                        <li>선택항목: 주소 </li>
                                    </ul>
                                </li>
                                <li>
                                    서비스 이용 시:
                                    <ul>
                                        <li>
                                            결제 정보: 신용카드 정보, 은행 계좌
                                            정보 등
                                        </li>
                                        <li>
                                            서비스 이용 기록, 접속 로그, 쿠키,
                                            접속 IP 정보
                                        </li>
                                    </ul>
                                    <li>
                                        고객 문의 시:
                                        <ul>
                                            <li>
                                                이름, 이메일 주소, 전화번호,
                                                문의 내용
                                            </li>
                                        </ul>
                                    </li>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 3 조 (개인정보의 수집 및 이용 목적)
                        </span>
                        <span className="body-text">
                            회사는 수집한 개인정보를 다음의 목적을 위해
                            이용합니다:
                            <ol>
                                <li>
                                    서비스 제공 및 운영:
                                    <ul>
                                        <li>
                                            회원 관리, 본인 확인, 서비스 제공
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    결제 처리:
                                    <ul>
                                        <li>
                                            구매 및 요금 결제, 금융거래 본인
                                            인증
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    마케팅 및 광고:
                                    <ul>
                                        <li>
                                            신규 서비스 개발 및 맞춤형 서비스
                                            제공, 이벤트 정보 제공
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    고객 지원:
                                    <ul>
                                        <li>고객 문의 처리, 공지사항 전달</li>
                                    </ul>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 4 조 (개인정보의 보유 및 이용 기간)
                        </span>
                        <span className="body-text">
                            회사는 원칙적으로 개인정보 수집 및 이용 목적이
                            달성된 후에는 해당 정보를 지체 없이 파기합니다. 단,
                            다음의 정보에 대해서는 아래의 이유로 명시한 기간
                            동안 보존합니다:
                            <ol>
                                <li>
                                    회사 내부 방침에 의한 정보 보유:
                                    <ul>
                                        <li>부정 이용 기록: 1년</li>
                                    </ul>
                                </li>
                                <li>
                                    관련 법령에 의한 정보 보유:
                                    <ul>
                                        <li>
                                            계약 또는 청약철회 등에 관한 기록:
                                            5년 (전자상거래 등에서의 소비자
                                            보호에 관한 법률)
                                        </li>
                                        <li>
                                            대금 결제 및 재화 등의 공급에 관한
                                            기록: 5년 (전자상거래 등에서의
                                            소비자 보호에 관한 법률)
                                        </li>
                                        <li>
                                            소비자의 불만 또는 분쟁 처리에 관한
                                            기록: 3년 (전자상거래 등에서의
                                            소비자 보호에 관한 법률)
                                        </li>
                                        <li>
                                            웹사이트 방문 기록: 3개월
                                            (통신비밀보호법)
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 5 조 (개인정보의 파기 절차 및 방법)
                        </span>
                        <span className="body-text">
                            회사는 원칙적으로 개인정보 수집 및 이용 목적이
                            달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기
                            절차 및 방법은 다음과 같습니다:
                            <ol>
                                <li>
                                    파기 절차:
                                    <ul>
                                        <li>
                                            이용자가 입력한 정보는 목적 달성 후
                                            별도의 DB로 옮겨져 내부 방침 및 기타
                                            관련 법령에 따라 일정 기간 저장된 후
                                            파기됩니다.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    파기 방법:
                                    <ul>
                                        <li>
                                            전자적 파일 형태의 정보는 기록을
                                            재생할 수 없는 기술적 방법을
                                            사용하여 삭제합니다.
                                        </li>
                                        <li>
                                            종이에 출력된 개인정보는 분쇄기로
                                            분쇄하거나 소각을 통해 파기합니다.
                                        </li>
                                    </ul>
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 6 조 (개인정보의 제3자 제공)
                        </span>
                        <span className="body-text">
                            회사는 이용자의 개인정보를 원칙적으로 외부에
                            제공하지 않습니다. 다만, 다음의 경우에는 예외로
                            합니다:
                            <ol>
                                <li>이용자가 사전에 동의한 경우</li>
                                <li>
                                    법령의 규정에 의거하거나, 수사 목적으로
                                    법령에 정해진 절차와 방법에 따라 수사기관의
                                    요구가 있는 경우
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 7 조 (개인정보의 처리 위탁)
                        </span>
                        <span className="body-text">
                            회사는 서비스 이행을 위해 다음과 같이 개인정보 처리
                            업무를 외부에 위탁하고 있습니다:
                            <ul>
                                <li>결제 처리: syluv 결제 대행사</li>
                            </ul>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 8 조 (이용자의 권리)
                        </span>
                        <span className="body-text">
                            이용자는 언제든지 다음의 권리를 행사할 수 있습니다:
                            <ol>
                                <li>개인정보 열람 요구</li>
                                <li>오류 등이 있을 경우 정정 요구</li>
                                <li>삭제 요구</li>
                                <li>
                                    처리 정지 요구 이용자는 개인정보 보호법 등
                                    관련 법령에 따라 권리를 행사할 수 있으며,
                                    회사는 이에 대해 지체 없이 조치하겠습니다.
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 9 조 (개인정보의 안전성 확보 조치)
                        </span>
                        <span className="body-text">
                            회사는 개인정보의 안전성 확보를 위해 다음과 같은
                            조치를 취하고 있습니다:
                            <ol>
                                <li>
                                    관리적 조치: 내부 관리 계획 수립 및 시행,
                                    정기적 직원 교육
                                </li>
                                <li>
                                    기술적 조치: 개인정보 처리 시스템의 접근
                                    권한 관리, 접근 통제 시스템 설치, 고유 식별
                                    정보의 암호화
                                </li>
                                <li>
                                    물리적 조치: 전산실, 자료 보관실 등의 접근
                                    통제
                                </li>
                            </ol>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 10 조 (개인정보 보호책임자)
                        </span>
                        <span className="body-text">
                            회사는 개인정보 처리에 관한 업무를 총괄해서
                            책임지고, 개인정보 처리와 관련한 이용자의 불만 처리
                            및 피해 구제 등을 위하여 아래와 같이 개인정보
                            보호책임자를 지정하고 있습니다:
                            <ul>
                                <li>개인정보 보호책임자: 박진아</li>
                                <li>
                                    연락처: 010-8634-0405, majincal@syluv.com
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div className="term">
                        <span className="title-text">
                            제 11 조 (개인정보처리방침의 변경)
                        </span>
                        <span className="body-text">
                            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및
                            방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는
                            경우에는 변경사항의 시행 7일 전부터 공지사항을
                            통하여 고지할 것입니다.
                        </span>
                    </div>
                </Terms>
            )}
        </>
    );
};

export default MyPage;

const Terms = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    line-height: 1.5;
    .term {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .title-text {
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.color.gray800};
    }
    .body-text {
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        color: ${({ theme }) => theme.color.gray700};
    }
    ol {
        list-style-type: decimal;
        padding-left: 20px;
    }
    li {
        line-height: 1.5;
    }
    ul {
        list-style-type: disc;
        margin-left: 20px;
    }
`;

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
