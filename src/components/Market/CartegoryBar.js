import { useState } from "react";
import styled from "styled-components";

const CategoryBar = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState("전체");

    return (
        <CategoryContainer>
            {categories.map((categories) => (
                <Category
                    key={categories}
                    onClick={() => {
                        setSelectedCategory(categories);
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
    gap: 16px;
`;

const Category = styled.div`
    display: flex;
    gap: 16px;
    border: 2px solid #ccc;
    border-radius: 20px;
    font-size: 12px;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#ccc" : "white")};
    color: ${(props) => (props.selected ? "white" : "black")};
`;
