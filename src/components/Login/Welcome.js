import styled from "styled-components";
import { ReactComponent as Customer } from "assets/images/customer.svg";
import { ReactComponent as CustomerClick } from "assets/images/customer_clicked.svg";
import { ReactComponent as Owner } from "assets/images/owner.svg";
import { ReactComponent as OwnerClick } from "assets/images/owner_clicked.svg";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const [isOwnerHovered, setIsOwnerHovered] = useState(false);
    const [isCustomerHovered, setIsCustomerHovered] = useState(false);

    const handleClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <Container>
            <Title>
                시장 방문객이신가요,
                <br />
                소상공인이신가요?
            </Title>
            <UserContainer>
                <Button
                    onClick={() => navigate("/owner/1")}
                    onMouseEnter={() => setIsOwnerHovered(true)}
                    onMouseLeave={() => setIsOwnerHovered(false)}
                >
                    <ButtonTitle>소상공인</ButtonTitle>
                    {isOwnerHovered ? <OwnerClick /> : <Owner />}
                </Button>
                <Button
                    onClick={handleClick}
                    onMouseEnter={() => setIsCustomerHovered(true)}
                    onMouseLeave={() => setIsCustomerHovered(false)}
                >
                    <ButtonTitle>손님</ButtonTitle>
                    {isCustomerHovered ? <CustomerClick /> : <Customer />}
                </Button>
            </UserContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 100dvh;
    padding: 0 20px;
`;

const Title = styled.span`
    font-size: 24px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 32px;
    text-align: center;
    position: absolute;
    top: 20%;
`;

const UserContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: 154px;
    width: 161px;
    padding: 17px;
    border-radius: 8px;
    color: ${({ theme }) => theme.color.gray300};
    border: 1px solid ${({ theme }) => theme.color.gray200};
    background-color: ${({ theme }) => theme.color.gray50};

    &:hover {
        box-shadow: 0px 4px 12px rgba(248, 63, 105, 0.08);
        background-color: rgba(248, 63, 105, 0.04);
        border: 1px solid ${({ theme }) => theme.color.primary};
        color: ${({ theme }) => theme.color.gray900};
    }
`;

const ButtonTitle = styled.div`
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

export default Welcome;
