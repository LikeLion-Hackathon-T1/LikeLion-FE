import React, { useState } from "react";
import "./Store.css";
import { ReactComponent as CartIcon } from "assets/images/cart.svg";
import Header from "components/Common/Header";

const reviews = [
    {
        id: 1,
        name: "김강민",
        rating: 5,
        comment: "리뷰 내용 예시 1",
    },
    {
        id: 2,
        name: "조재연",
        rating: 4,
        comment: "리뷰 내용 예시 2",
    },
];

function Store() {
    const [activeTab, setActiveTab] = useState("menu");

    const renderMenu = () => (
        <div className="menu-items">
            <div className="menu-item">
                <img src="https://via.placeholder.com/150" alt="Item" />
                <div className="item-info">
                    <p>뉴욕 함스테이크 도시락</p>
                    <p>15,000원</p>
                </div>
                <button className="add-button">+</button>
            </div>
            <div className="menu-item">
                <img src="https://via.placeholder.com/150" alt="Item" />
                <div className="item-info">
                    <p>뉴욕 함스테이크 도시락</p>
                    <p>15,000원</p>
                </div>
                <button className="add-button">+</button>
            </div>
        </div>
    );

    const renderReviews = () => (
        <div className="reviews">
            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <div className="review-header">
                        <div className="review-avatar"></div>
                        <div className="review-info">
                            <p className="review-name">{review.name}</p>
                            <p className="review-rating">
                                {"⭐".repeat(review.rating)}
                            </p>
                        </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <Header backTitle="광장시장" />
            <div className="main-image">
                <img src="https://via.placeholder.com/500" alt="Main" />
                <div className="carousel-indicator">•••</div>
            </div>
            <div className="store-info">
                <h2>세미수산</h2>
                <p>리뷰 532개</p>
                <p>영업시간 06:00 ~ 23:00</p>
                <p>위치 서울시 ~~~ 41호</p>
                <p>전화번호: 010-2321-3241</p>
            </div>
            <div className="menu-review-tabs">
                <button
                    className={`tab ${activeTab === "menu" ? "active" : ""}`}
                    onClick={() => setActiveTab("menu")}
                >
                    메뉴
                </button>
                <button
                    className={`tab ${activeTab === "reviews" ? "active" : ""}`}
                    onClick={() => setActiveTab("reviews")}
                >
                    리뷰
                </button>
            </div>
            {activeTab === "menu" ? renderMenu() : renderReviews()}
        </div>
    );
}

export default Store;
