import styled from "styled-components";
import CategoryBar from "./CartegoryBar";
import MarketInfo from "./MarketInfo";
import MarketList from "./MarketList";

const categories = ["전체", "음식", "의류", "가구", "기타"];

const MarketTab = ({ market }) => {
    return (
        <div>
            <Container>
                <Title>광장시장 정보</Title>
                <MarketInfo
                    detail="광장시장은 서울 중구 신당동에 위치한 전통시장입니다."
                    holiday="매주 일요일"
                    businessHours={["09:00 - 19:00"]}
                />
            </Container>
            <Container>
                <Title>광장시장 가게 찾기</Title>
                <Search type="text" placeholder="가게 이름을 입력해주세요." />
                <CategoryBar categories={categories} />
                <MarketList />
            </Container>
        </div>
    );
};

export default MarketTab;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px 0 30px 0;
    gap: 16px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Search = styled.input`
    height: 32px;
    border: 2px solid #ccc;
    border-radius: 4px;
    padding: 0 8px;
    font-size: 12px;
`;
