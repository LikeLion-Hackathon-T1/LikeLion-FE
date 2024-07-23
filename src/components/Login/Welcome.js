import styled from "styled-components";
import { ReactComponent as Customer } from "assets/images/customer.svg";
import { ReactComponent as Owner } from "assets/images/owner.svg";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate("/");
        console.log("hi");
    }, [navigate]);

    return (
        <Container>
            <TitleContainer>
                <Title>시장 방문객이신가요,</Title>
                <Title>소상공인이신가요?</Title>
            </TitleContainer>
            <UserContainer>
                <OwnerButton onClick={handleClick}>
                    <OwnerButtonTitle>사장님</OwnerButtonTitle>
                    <OwnerImage />
                </OwnerButton>
                <CustomerButton onClick={handleClick}>
                    <ButtonTitle>손님</ButtonTitle>
                    <CustomerImage />
                </CustomerButton>
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

const TitleContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 132px;
`;

const Title = styled.span`
    font-size: 24px;
    color: ${({ theme }) => theme.color.gray900};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
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
    height: 155px;
    width: 166px;
    padding: 20px;
    border-radius: 8px;
`;

const OwnerButton = styled(Button)`
    box-shadow: 0px 4px 12px rgba(24, 24, 24, 0.08);
    background-color: white;
    border: ${({ theme }) => `1px solid ${theme.color.gray100}`};
`;

const CustomerButton = styled(Button)`
    box-shadow: 0px 4px 12px rgba(248, 63, 105, 0.08);
    background-color: #fffafb;
    border: 1px solid #f83f69;
`;

const ButtonTitle = styled.div`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray800};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const OwnerButtonTitle = styled(ButtonTitle)`
    color: ${({ theme }) => theme.color.gray300};
`;

const CustomerImage = styled(Customer)`
    margin-left: 15px;
`;

const OwnerImage = styled(Owner)`
    margin-right: 20px;
    filter: grayscale(100%);
`;

export default Welcome;
