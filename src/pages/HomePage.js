import Header from "components/Common/Header";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import { ReactComponent as Location } from "assets/images/location.svg";
import styled from "styled-components";
import { useState } from "react";

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
                <NearbyMarket>
                    <span className="title">
                        김강민님과
                        <br />
                        지금 가까운 시장은?
                    </span>
                    <div className="location">
                        <Location />
                        <span>광장시장</span>
                    </div>
                </NearbyMarket>
                <LatestMarket>
                    <span>최근 방문한 시장</span>
                    <div>
                        <img
                            src="https://via.placeholder.com/150"
                            alt="최근 방문한 시장"
                        />
                        <div>
                            <span>광장시장</span>
                            <div>
                                <div>
                                    <div>4.2</div>
                                    <span>2024.07.12 방문</span>
                                </div>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </LatestMarket>
            </Wrapper>
        </>
    );
};

export default HomePage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 0 20px;
`;

const LatestMarket = styled.div`
    margin-top: 44px;
`;

const NearbyMarket = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    .title {
        font-size: 24px;
        font-weight: ${(props) => props.theme.fontWeight.semiBold};
        color: ${(props) => props.theme.color.gray900};
        line-height: 36px;
    }

    .location {
        display: flex;
        align-items: center;
        gap: 4px;
        
        span {
            font-size: 20px;
            font-weight: ${(props) => props.theme.fontWeight.bold};
            color: ${(props) => props.theme.color.primary};
    }
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
