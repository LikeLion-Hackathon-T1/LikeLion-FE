import styled from "styled-components";
import VisitList from "./VisitList";
import { Map } from "react-kakao-maps-sdk";

const VisitTab = () => {
    return (
        <Container>
            <Map
                style={{
                    width: "100%",
                    height: "300px",
                }}
                center={{
                    lat: 37.5665,
                    lng: 126.978,
                }}
                level={3}
            />
            <VisitList />
        </Container>
    );
};

export default VisitTab;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`;
