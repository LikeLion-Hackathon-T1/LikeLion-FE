import styled from "styled-components";
import MenuItem from "./MenuItem";

const MenuList = ({ order }) => {
    return (
        <Container>
            {order?.menuOrders.map((item, index) => (
                <MenuItem key={index} item={item} />
            ))}
        </Container>
    );
};

export default MenuList;

const Container = styled.div`
    width: 100%;
    margin-top: 8px;
    margin-bottom: 12px;
`;
