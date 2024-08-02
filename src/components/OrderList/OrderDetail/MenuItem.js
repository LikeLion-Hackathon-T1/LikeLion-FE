import styled from "styled-components";

const MenuItem = ({ item }) => {
    const handlePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <Container>
            <img src={item.menuImg} alt="menu" />
            <div className="menu">
                <div className="menu-header">
                    <span className="title-text">{item.menuName}</span>
                    <span className="sub-text"> {item.quantity}개</span>
                </div>
                <span className="price">
                    가격: {handlePrice(item.totalPrice)}원
                </span>
            </div>
        </Container>
    );
};

export default MenuItem;

const Container = styled.div`
    padding: 24px 20px;
    display: flex;
    gap: 12px;
    position: relative;

    border-top: 1px solid ${({ theme }) => theme.color.gray100};

    img {
        width: 78px;
        height: 78px;
        border-radius: 12px;
    }

    .menu {
        margin: 2px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .menu-header {
            display: flex;
            font-weight: ${({ theme }) => theme.fontWeight.medium};
            flex-direction: column;
            font-size: 14px;
            gap: 8px;

            .title-text {
                color: ${({ theme }) => theme.color.black900};
            }

            .sub-text {
                color: ${({ theme }) => theme.color.gray500};
            }
        }

        .price {
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
            color: ${({ theme }) => theme.color.black900};
            font-size: 16px;
        }
    }
`;
