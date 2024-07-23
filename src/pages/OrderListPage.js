import Header from "components/Common/Header";
import DayList from "components/Order/DayList";
import styled from "styled-components";

const OrderListPage = () => {
    return (
        <Container>
            <Header title="주문내역" home={"true"} />
            <DayList />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox
`;

export default OrderListPage;
