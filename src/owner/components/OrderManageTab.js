import { useEffect, useState } from "react";
import styled from "styled-components";
import OrderManageItem from "./OrderManageItem";
import OwnerDetailPage from "owner/pages/OwnerDetailPage";

const OrderManageTab = () => {
    const [selected, setSelected] = useState("신규/진행중");
    const [items, setItems] = useState([
        {
            id: 1,
            status: "주문",
            orderNumber: "B1UD01004L",
            orderTime: "08:12",
            pickupTime: "08:20",
            menu: [
                {
                    name: "매콤 제육볶음",
                    count: 2,
                    price: 20000,
                },
                {
                    name: "키토김밥",
                    count: 1,
                    price: 5000,
                },
                {
                    name: "스시",
                    count: 1,
                    price: 10000,
                },
                {
                    name: "오니기리",
                    count: 1,
                    price: 5000,
                },
            ],
            price: "토스페이 40,000원(예금주:OOO)",
        },
        {
            id: 2,
            status: "주문접수",
            orderNumber: "B1U343404L",
            orderTime: "08:10",
            pickupTime: "08:30",
            menu: [
                {
                    name: "매콤 제육볶음",
                    count: 2,
                    price: 20000,
                },
                {
                    name: "키토김밥",
                    count: 1,
                    price: 5000,
                },
                {
                    name: "스시",
                    count: 1,
                    price: 10000,
                },
                {
                    name: "오니기리",
                    count: 1,
                    price: 5000,
                },
            ],
            price: "토스페이 40,000원(예금주:OOO)",
        },
        {
            id: 3,
            status: "준비완료",
            orderNumber: "A12301034L",
            orderTime: "08:09",
            pickupTime: "08:40",
            menu: [
                {
                    name: "매콤 제육볶음",
                    count: 2,
                    price: 20000,
                },
                {
                    name: "키토김밥",
                    count: 1,
                    price: 5000,
                },
                {
                    name: "스시",
                    count: 1,
                    price: 10000,
                },
                {
                    name: "오니기리",
                    count: 1,
                    price: 5000,
                },
            ],
            price: "토스페이 40,000원(예금주:OOO)",
        },
        {
            id: 4,
            status: "픽업완료",
            orderNumber: "E1U231004A",
            orderTime: "08:08",
            pickupTime: "08:50",
            menu: [
                {
                    name: "매콤 제육볶음",
                    count: 2,
                    price: 20000,
                },
                {
                    name: "키토김밥",
                    count: 1,
                    price: 5000,
                },
                {
                    name: "스시",
                    count: 1,
                    price: 10000,
                },
                {
                    name: "오니기리",
                    count: 1,
                    price: 5000,
                },
            ],
            price: "토스페이 40,000원(예금주:OOO)",
        },
    ]);
    const [endItems, setEndItems] = useState([]);
    const [newItems, setNewItems] = useState([]);
    const [detailItem, setDetailItem] = useState(null);

    useEffect(() => {
        const newItems = items.filter(
            (item) => item.status !== "픽업완료" && item.status !== "cancel"
        );
        const endItems = items.filter(
            (item) => item.status === "픽업완료" || item.status === "cancel"
        );
        setNewItems(newItems);
        setEndItems(endItems);
    }, [items]);

    const handleStatus = (id) => {
        //주문 => 주문접수 => 준비완료 => 방문대기 => 픽업완료
        const newItems = items.map((item) => {
            if (item.id === id) {
                if (item.status === "주문") {
                    return { ...item, status: "주문접수" };
                } else if (item.status === "주문접수") {
                    return { ...item, status: "준비완료" };
                } else if (item.status === "준비완료") {
                    return { ...item, status: "픽업완료" };
                }
            }
            return item;
        });
        setItems(newItems);
    };

    const handleCancel = (id) => {
        //status를 cancel로 바꾸기
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, status: "cancel" };
            }
            return item;
        });
        setItems(newItems);
    };

    const handleDetailItem = (item) => {
        setDetailItem(item);
    };

    if (detailItem !== null) {
        console.log(detailItem);
        return (
            <OwnerDetailPage
                item={detailItem}
                handleItem={handleDetailItem}
                handleCancel={handleCancel}
                handleSuccess={handleStatus}
            />
        );
    }

    return (
        <Container>
            <div className="button-bar">
                <button
                    className={selected === "신규/진행중" ? "selected" : ""}
                    onClick={() => setSelected("신규/진행중")}
                >
                    신규/진행중
                </button>
                <button
                    className={selected === "준비 완료" ? "selected" : ""}
                    onClick={() => setSelected("준비 완료")}
                >
                    완료한 주문
                </button>
            </div>
            {selected === "신규/진행중" ? (
                <div className="body">
                    {newItems.map((item, index) => (
                        <OrderManageItem
                            key={item.id}
                            item={item}
                            onClick={handleStatus}
                            handleItem={handleDetailItem}
                        />
                    ))}
                </div>
            ) : (
                <div className="body">
                    {endItems.map((item, index) => (
                        <OrderManageItem
                            key={item.id}
                            item={item}
                            handleDetailItem={handleDetailItem}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default OrderManageTab;

const Container = styled.div`
    .body {
        display: flex;
        flex-direction: column;
        gap: 8px;

        color: ${({ theme }) => theme.color.gray600};
        font-size: 14px;
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }

    margin-top: 130px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 35px;

    .button-bar {
        margin: 0px 20px;
        display: flex;
        gap: 7px;

        button {
            color: ${({ theme }) => theme.color.gray400};
            font-weight: ${({ theme }) => theme.fontWeight.regular};
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 54px;
            border: 1px solid ${({ theme }) => theme.color.gray400};
            background-color: white;
            cursor: pointer;
        }
        .selected {
            color: ${({ theme }) => theme.color.primary};
            border: 1px solid ${({ theme }) => theme.color.primary};
        }
    }
`;
