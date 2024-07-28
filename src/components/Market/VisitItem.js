import styled from "styled-components";
import { ReactComponent as Time } from "assets/images/visit_time.svg";
import { ReactComponent as Time2 } from "assets/images/visit_time2.svg";

const VisitItem = ({ index, item, isLast }) => {
    return (
        <ListItem>
            <Container>
                <Number>{index}</Number>
                {!isLast && <div className="line" />} {/* 수정된 부분 */}
            </Container>

            <Wrapper>
                <div className="store">
                    <img src="https://via.placeholder.com/100" alt="store" />
                    <div className="store-info">
                        <di className="store-header">
                            <span>분식</span>
                            <span className="store-name">{item.store}</span>
                        </di>
                        <div className="time">
                            <Time />
                            <span>11:21</span>
                        </div>
                    </div>
                </div>
                <div className="status">{item.status}</div>
            </Wrapper>
        </ListItem>
    );
};

export default VisitItem;

const Container = styled.div`
    display: flex;
    flex-direction: column;

    .line {
        border-left: 1px solid ${({ theme }) => theme.color.gray100};
        width: 0px;
        height: 77px;
        margin-left: 10.5px;
    }
`;

const Number = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontSize.semiBold};
    color: white;
`;

const ListItem = styled.div`
    display: flex;
    justify-content: space-between;

    img {
        border-radius: 14px;
        width: 70px;
        height: 70px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    margin-left: 12px;

    .store {
        display: flex;
        gap: 12px;
    }

    .store-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 3px 0;
    }

    .store-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray400};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
        .store-name {
            font-size: 14px;
            color: ${({ theme }) => theme.color.gray900};
            font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        }
    }

    .time {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray300};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    .status {
        font-size: 12px;
        color: ${({ theme }) => theme.color.gray300};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
`;
