import styled from "styled-components";
import CategoryBar from "./CartegoryBar";
import MarketList from "./MarketList";
import { ReactComponent as SearchIcon } from "assets/images/search.svg";

const categories = ["전체", "음식", "의류", "가구", "기타"];

const MarketTab = ({ market }) => {
    return (
        <div>
            <Container>
                <Search>
                    <SearchIcon />
                    <SearchInput placeholder="가게를 찾아볼까요?" />
                </Search>
                <CategoryBar categories={categories} />
                <MarketList />
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
