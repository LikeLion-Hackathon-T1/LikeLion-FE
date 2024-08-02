import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const CategoryBar = ({ categories, onClick }) => {
    const [selectedCategory, setSelectedCategory] = useState("전체");

    const handleClick = (category) => {
        if (category === "전체") {
            onClick("");
        } else {
            onClick(category);
        }
        setSelectedCategory(category);
    };

    return (
        <CategoryContainer>
            <Swiper slidesPerView={6} spaceBetween={8}>
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
    text-wrap: nowrap;
`;

const Category = styled.div`
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
