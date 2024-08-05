import styled from "styled-components";

export const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  position: relative;
  overflow-y: hidden;
  -ms-overflow-style: hidden;
  height: 100%;
`;

export const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 14px;
  position: relative;
  height: 272px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  padding: 8px;
`;

export const HomeButton = styled.div`
  position: absolute;
  top: 16px;
  right: calc(20px + 32px + 12px);
  cursor: pointer;
  padding: 8px;
`;

export const CartButton = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
`;

const HeaderBack = styled.div`
  position: absolute;
  opacity: 0.3;
  background-color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const HeaderBack3 = styled(HeaderBack)`
  top: 16px;
  left: 16px;
`;

export const HeaderBack1 = styled(HeaderBack)`
  top: 16px;
  right: 64px;
`;

export const HeaderBack2 = styled(HeaderBack)`
  top: 16px;
  right: 20px;
`;

export const CartBadge = styled.div`
  position: absolute;
  top: 5px;
  left: 23px;
  width: 15px;
  height: 15px;
  background-color: #ff6b00;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  z-index: 1;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 12px;
  margin-left: 20px;
  margin-top: 20px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-left: 20px;
`;

export const Line = styled.div`
  width: 480px;
  align-content: center;
  height: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 70px;
  width: 440px;
  padding: 0 20px;
  background-color: white;
  border-radius: 8px;
  @media (max-width: 480px) {
    width: calc(100% - 40px);
  }
  border-top: 1px solid ${({ theme }) => theme.color.gray100};
  padding-top: 10px;
`;

export const QuantityLabel = styled.span`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 4px;
  padding: 5px 5px;
  width: 110px;
  height: 28px;
`;

export const QuantityButton1 = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: #cccccc;
`;

export const QuantityButton2 = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export const Quantity = styled.span`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: 40px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray800};
`;

export const AddToCartButton = styled.button`
  position: sticky;
  position: fixed;
  width: 440px;
  height: 48px;
  background-color: #ff6b00;
  color: white;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border: none;
  border-radius: 8px;
  bottom: 10px;
  margin: 0 20px;
  @media (max-width: 480px) {
    width: calc(100% - 40px);
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

export const VisitModal = styled.div`
  width: 336px;
  height: 166px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 0 20px;

  .buttons {
    width: 100%;
    display: flex;
    gap: 12px;
  }

  font-size: 18px;
  color: ${({ theme }) => theme.color.gray900};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  .title-text {
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.gray900};
    margin-bottom: 20px;
  }

  .sub-text {
    font-size: 20px;
    color: ${({ theme }) => theme.color.primary};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    margin-bottom: 20px;
  }
`;

export const ModalButton = styled.button`
  flex: 1;
  background-color: #ff6b00;
  color: white;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  width: 143px;
  height: 46px;

  &:nth-child(1) {
    background-color: white;
    color: #ff6b00;
    border: 1px solid #ff6b00;
  }
`;
