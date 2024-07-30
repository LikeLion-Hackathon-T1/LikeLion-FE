import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MenuItem from "../components/Store/MenuItem";
import ReviewItem from "../components/Store/ReviewItem";
import StoreInfo from "../components/Store/StoreInfo";
import NavBar from "../components/Common/NavBar.js";
import useSyluvAxios from "hooks/useSyluvAxios";
import MenuItemDetail from "components/Store/MenuItemDetail";

const PageWrapper = styled.div`
    font-family: "Pretendard", sans-serif;
    padding: 0;
    margin: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const Section = styled.section`
    flex: 1;
    overflow-y: auto;
    padding: 0 20px;
    background-color: white;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox
`;

const StorePage = () => {
    const [activeSection, setActiveSection] = useState("메뉴");
    const navigate = useNavigate();
    const { storeId } = useParams();
    const axiosInstance = useSyluvAxios();
    const queryClient = useQueryClient();
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        console.log(selectedMenu);
    }, [selectedMenu]);

    const fetchStoreAndMenuData = async () => {
        try {
            const response = await axiosInstance.get("/store/info");
            console.log("Full Store and Menu Data Response:", response.data);
            if (response.data && response.data.payload) {
                const store = response.data.payload.find(
                    (item) => item.storeId === parseInt(storeId)
                );
                if (store) {
                    console.log("Store Data:", store);
                    return store;
                } else {
                    console.error("Store not found");
                    throw new Error("Store not found");
                }
            } else {
                console.error("Invalid store data response", response);
                throw new Error("Invalid store data response");
            }
        } catch (error) {
            console.error("Error fetching store data:", error);
            throw error;
        }
    };

    const fetchReviewData = async () => {
        try {
            const response = await axiosInstance.get(`/review`, {
                params: { storeId },
            });
            console.log("Full Review Data Response:", response.data);
            if (response.data && response.data.payload) {
                return response.data.payload;
            } else {
                console.error("Invalid review data response", response);
                throw new Error("Invalid review data response");
            }
        } catch (error) {
            console.error("Error fetching review data:", error);
            throw error;
        }
    };

    const {
        data: storeData,
        error: storeError,
        isError: isStoreError,
        isLoading: isStoreLoading,
    } = useQuery({
        queryKey: ["storeAndMenuData", storeId],
        queryFn: fetchStoreAndMenuData,
    });

    const {
        data: reviewData,
        error: reviewError,
        isError: isReviewError,
        isLoading: isReviewLoading,
    } = useQuery({
        queryKey: ["reviewData", storeId],
        queryFn: fetchReviewData,
    });

    const handleReviewDelete = (reviewId) => {
        queryClient.setQueryData(["reviewData", storeId], (oldData) =>
            oldData.filter((review) => review.id !== reviewId)
        );
    };

    if (isStoreLoading || isReviewLoading) {
        return <div>Loading...</div>;
    }

    if (isStoreError || isReviewError) {
        console.error("Error fetching data", { storeError, reviewError });
        return <div>Error fetching data</div>;
    }

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    return selectedMenu ? (
        <MenuItemDetail menu={selectedMenu} onClick={handleMenuClick} />
    ) : (
        <PageWrapper>
            {storeData && (
                <>
                    <StoreInfo
                        name={storeData.name}
                        call={storeData.contact}
                        address={storeData.location}
                        openHours={storeData.openHours}
                        closeHours={storeData.closeHours}
                        ratingAvg={storeData.ratingAvg}
                        storeImage={storeData.storeImage}
                        category={storeData.category}
                    />
                    <NavBar
                        items={["메뉴", "리뷰"]}
                        selected={activeSection}
                        handleSelected={setActiveSection}
                    />
                    {activeSection === "메뉴" && (
                        <Section>
                            {storeData.menuDetails.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    item={item}
                                    onClick={handleMenuClick}
                                />
                            ))}
                        </Section>
                    )}
                    {activeSection === "리뷰" && (
                        <Section>
                            {reviewData.map((review, index) => (
                                <ReviewItem
                                    key={index}
                                    review={review}
                                    onDelete={handleReviewDelete}
                                />
                            ))}
                        </Section>
                    )}
                </>
            )}
        </PageWrapper>
    );
};

export default StorePage;
