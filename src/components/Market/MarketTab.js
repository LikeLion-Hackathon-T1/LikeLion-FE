import styled from "styled-components";
import CategoryBar from "./CartegoryBar";
import MarketList from "./MarketList";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";
import MarketInfo from "./MarketInfo";
import { useState } from "react";
import Splash from "components/Common/Splash";

const categories = [
    "전체",
    "한식",
    "분식",
    "간식",
    "음료",
    "식료품",
    "의류",
    "의류잡화",
    "직물",
    "침구",
    "생활잡화",
    "기타",
];

const MarketTab = ({
    marketInfo,
    marketHours,
    visitList,
    marketId,
    onChange = () => {},
}) => {
    const [searchInfo, setSearchInfo] = useState({
        search: "",
        category: "",
    });
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setSearchInfo({
                ...searchInfo,
                search: searchInput,
            });
        }
    };

    const handleCategory = (category) => {
        setSearchInfo({
            search: "",
            category: category,
        });
        setSearchInput("");
    };

    if (!marketInfo) {
        return <Splash />;
    }

    return (
        <div>
            <MarketInfo
                imgSrc={marketInfo?.image}
                call={marketInfo?.contact}
                address={marketInfo?.location}
                time={marketHours?.toString()}
            />
            <Container>
                <Search>
                    <SearchIcon />
                    <SearchInput
                        placeholder="가게를 찾아볼까요?"
                        value={searchInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </Search>
                <CategoryBar categories={categories} onClick={handleCategory} />
                <MarketList
                    searchInfo={searchInfo}
                    marketId={marketId}
                    visitList={visitList}
                    onChange={onChange}
                />
            </Container>
        </div>
    );
};

export default MarketTab;

const Container = styled.div`
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Search = styled.div`
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
