import Header from "components/Common/Header";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import styled from "styled-components";
import { useState } from "react";
import LatestMarket from "components/\bHome/LatestMarket";
import HotMarket from "components/\bHome/HotMarket";
import NearbyMarket from "components/\bHome/NearbyMarket";
import { ReactComponent as HomeIcon } from "assets/images/nav-home.svg";
import { ReactComponent as VisitIcon } from "assets/images/nav-visit.svg";
import { ReactComponent as OrderIcon } from "assets/images/nav-order.svg";
import { ReactComponent as MyPageIcon } from "assets/images/nav-my.svg";
import { ReactComponent as QrIcon } from "assets/images/nav-qr.svg";

const HomePage = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
        }
    };
    return (
        <>
            <Header title="" back={false} logo={true} />
            <Wrapper>
                <Search>
                    <SearchIcon />
                    <SearchInput
                        placeholder="무슨 시장에 가고 싶으신가요?"
                        value={searchInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </Search>
                <NearbyMarket />
                <LatestMarket />
                <HotMarket />
            </Wrapper>
            <TabBar>
                <div className="wrapper">
                    <div>
                        <HomeIcon stroke="#cccccc" />
                        <span>홈</span>
                    </div>
                    <div>
                        <VisitIcon stroke="#cccccc" fill="#cccccc" />
                        <span>방문</span>
                    </div>
                    <QR />
                    <div>
                        <OrderIcon stroke="#cccccc" />
                        <span>홈</span>
                    </div>
                    <div>
                        <MyPageIcon stroke="#cccccc" />
                        <span>방문</span>
                    </div>
                </div>
            </TabBar>
        </>
    );
};

export default HomePage;

const TabBar = styled.div`
    position: fixed;
    bottom: 12px;
    width: 480px;
    height: 60px;
    background-color: white;
    border-top: 1px solid ${(props) => props.theme.color.gray100};
    box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.02);
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
    .wrapper {
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
                font-size: 12px;
                margin-top: 4px;
                color: ${(props) => props.theme.color.gray200};
            }
        }
    }
`;

const QR = styled(QrIcon)``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 0 20px;
`;

const Search = styled.div`
    margin-top: 12px;
    width: calc(100% - 28px);
    padding: 0 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    height: 40px;
    border: ${(props) => `1px solid ${props.theme.color.gray100}`};
    border-radius: 8px;
    background-color: ${(props) => props.theme.color.gray50};
`;

const SearchInput = styled.input`
    border: none;
    background-color: transparent;
    width: 100%;
    font-size: 16px;
    //활성화시 보더 삭제
    &:focus {
        outline: none;
    }
    color: ${(props) => props.theme.color.gray900};
    // 플레이스홀더 컬러
    &::placeholder {
        color: ${(props) => props.theme.color.gray500};
    }
`;
