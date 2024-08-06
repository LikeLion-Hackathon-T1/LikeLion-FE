import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const CategoryBar = ({ categories, onClick }) => {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [slidesPerView, setSlidesPerView] = useState(6);

    const handleClick = (category) => {
        if (category === "전체") {
            onClick("");
        } else {
            onClick(category);
        }
        setSelectedCategory(category);
    };

    useEffect(() => {
        // Function to adjust the slides per view based on the window width
        const handleResize = () => {
            if (window.innerWidth <= 400) {
                setSlidesPerView(5);
            } else {
                setSlidesPerView(6);
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <CategoryContainer>
            <Swiper slidesPerView={slidesPerView} spaceBetween={8}>
                {categories.map((categories) => (
                    <SwiperSlide key={categories}>
                        <Category
                            onClick={() => {
                                handleClick(categories);
                            }}
                            selected={selectedCategory === categories}
                        >
                            {categories}
                        </Category>
                    </SwiperSlide>
                ))}
            </Swiper>
        </CategoryContainer>
    );
};

export default CategoryBar;

const CategoryContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
`;

const Category = styled.div`
    word-wrap: keep-all;
    word-break: keep-all;
    border: ${(props) =>
        props.selected
            ? `1px solid ${props.theme.color.primary}`
            : `1px solid ${props.theme.color.gray400}`};
    border-radius: 54px;
    font-size: 14px;
    text-align: center;
    padding: 8px 0px;
    cursor: pointer;
    color: ${(props) =>
        props.selected ? props.theme.color.primary : props.theme.color.gray400};
`;
