import styled from "styled-components";

const MenuList = () => {
    return (
        <Container>
            <div className="item">
                <img src="https://via.placeholder.com/150" alt="menu" />
                <div className="menu">
                    <span>광어 모듬회 세트 1개</span>
                    <div className="price">
                        <span className="price-text">기본: 32,000원</span>
                        <span className="sub-text">32,000원</span>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="https://via.placeholder.com/150" alt="menu" />
                <div className="menu">
                    <span>광어 모듬회 세트 1개</span>
                    <div className="price">
                        <span className="price-text">기본: 32,000원</span>
                        <span className="sub-text">32,000원</span>
                    </div>
                </div>
            </div>
            <div className="item">
                <img src="https://via.placeholder.com/150" alt="menu" />
                <div className="menu">
                    <span>광어 모듬회 세트 1개</span>
                    <div className="price">
                        <span className="price-text">기본: 32,000원</span>
                        <span className="sub-text">32,000원</span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MenuList;

const Container = styled.div`
    width: calc(100% - 40px);
    padding: 4 0px;
    margin-top: 17px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.color.gray100};

    .item {
        padding: 0px 20px;
        display: flex;
        gap: 12px;
        position: relative;
        padding-bottom: 16px;
        padding-top: 16px;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: ${({ theme }) => theme.color.gray100};
        }

        &:last-child::after {
            content: none;
        }

        img {
            width: 70px;
            height: 70px;
            border-radius: 12px;
        }

        .menu {
            padding: 1px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 8px;

            span {
                font-size: 16px;
                font-weight: ${({ theme }) => theme.fontWeight.medium};
                color: ${({ theme }) => theme.color.gray900};
            }

            .price {
                display: flex;
                flex-direction: column;
                gap: 8px;

                .price-text {
                    font-size: 14px;
                    font-weight: ${({ theme }) => theme.fontWeight.medium};
                    color: ${({ theme }) => theme.color.gray500};
                }

                .sub-text {
                    font-size: 16px;
                    font-weight: ${({ theme }) => theme.fontWeight.bold};
                    color: ${({ theme }) => theme.color.gray900};
                }
            }
        }
    }
`;
