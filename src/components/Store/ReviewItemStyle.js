import styled from "styled-components";

export const ReviewContainer = styled.div`
  margin-bottom: 44px;
  background-color: ${({ isMine }) =>
    isMine ? "rgba(255, 107, 0, 0.04)" : "transparent"};
  padding-bottom: 24px;
  border-bottom: ${({ isLastMyReview }) =>
    isLastMyReview ? "1px solid rgba(255, 107, 0, 0.3)" : "none"};
  &:first-child {
    margin-top: 0;
  }
  margin-left: ${({ isMine }) => (isMine ? "-20px" : "0")};
  margin-right: ${({ isMine }) => (isMine ? "-20px" : "0")};
  padding-left: ${({ isMine }) => (isMine ? "20px" : "0")};
  padding-right: ${({ isMine }) => (isMine ? "20px" : "0")};

  ${({ isFirstOtherReview }) =>
    isFirstOtherReview &&
    `
    margin-top: 20px;
  `}

  &:not(:last-child) {
    margin-bottom: ${({ isMine, isLastMyReview }) =>
      isMine ? "0" : isLastMyReview ? "20px" : "20px"};
  }
`;

export const MyReviewContainer = styled.div`
  margin: 0;
  padding: 0;
`;

export const MyReviewText = styled.span`
  display: block;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.gray900};
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: "";
    display: block;
    width: calc(100% + 40px);
    height: 20px;
    background-color: rgba(255, 107, 0, 0.04);
    position: absolute;
    top: -20px;
    left: -20px;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 14px;
`;

export const StarsAndTime = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
`;

export const Star = styled.span`
  font-size: 14px;
  color: ${({ $filled }) => ($filled === "true" ? "gold" : "#CCCCCC")};
  margin-top: 4px;
  gap: 1px;
`;

export const Time = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray400};
  font-size: 12px;
  margin-top: 4px;
  margin-right: 4px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  outline: none;
  color: ${({ theme }) => theme.color.gray400};
  margin-left: auto;
  margin-right: 0px;
  margin-top: 16px;
`;

export const ReviewImageContainerSingle = styled.div`
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 19px;
  aspect-ratio: 1.6 / 1;
`;

export const ReviewImageContainerMultiple = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow-x: auto;
  display: flex;
  margin-top: 19px;
  padding-right: 20px;
  gap: 6px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SingleReviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const MultipleReviewImage = styled.img`
  width: 250px;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  flex: 0 0 auto;
`;

export const MenuName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray300};
  margin-top: 19px;
`;

export const ReviewText = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.gray800};
  margin-bottom: 6px;
`;

export const Helpfulness = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.gray500};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: 14px;
  margin-top: 10px;
  height: 24px;
`;

export const HelpfulButton = styled.button`
  background: none;
  border: 1px solid ${({ $active }) => ($active ? "#9A9A9A" : "#ff6b00")};
  border-radius: 54px;
  color: ${({ $active }) => ($active ? "#9A9A9A" : "#ff6b00")};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  outline: none;
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
`;

export const ReviewResponse = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #fafafa;
  border-radius: 8px;
`;

export const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const ResponseTitle = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  margin-right: 4px;
  font-size: 14px;
`;

export const ResponseTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray400};
`;

export const ResponseText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray800};
`;
