import { useState } from "react";
import styled from "styled-components";

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
            {categories.map((categories) => (
                <Category
                    key={categories}
                    onClick={() => {
                        handleClick(categories);
                    }}
                    selected={selectedCategory === categories}
                >
                    {categories}
                </Category>
            ))}
        </CategoryContainer>
    );
};

export default CategoryBar;

const CategoryContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
`;

const Category = styled.div`
    border: ${(props) =>
        props.selected
            ? `1px solid ${props.theme.color.primary}`
            : `1px solid ${props.theme.color.gray400}`};
    border-radius: 54px;
    font-size: 14px;
    text-align: center;
    padding: 8px 12px;
    cursor: pointer;
    color: ${(props) =>
        props.selected ? props.theme.color.primary : props.theme.color.gray400};
`;
