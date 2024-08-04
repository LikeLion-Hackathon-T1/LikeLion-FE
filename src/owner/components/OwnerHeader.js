import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect, useState } from "react";

const OwnerHeader = ({ name }) => {
    const syluvAxios = useSyluvAxios();
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState([]);

    const handleSelectStore = (storeId) => {
        navigate(`/owner/${storeId}`);
    };

    useEffect(() => {
        syluvAxios.get(`/store/info`).then((res) => {
            setStoreData(res.data.payload);
        });
    }, []);

    console.log(storeData);

    return (
        <Header>
            <div className="title">{name}</div>
            <select
                onChange={(e) => handleSelectStore(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>
                    가게 이동
                </option>
                {storeData.map((store) => (
                    <option key={store.storeId} value={store.storeId}>
                        {store.name}
                    </option>
                ))}
            </select>
        </Header>
    );
};

export default OwnerHeader;

const Header = styled.div`
    height: 52px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.gray900};

    .title {
        margin-left: 22px;
        font-size: 20px;
        font-weight: ${({ theme }) => theme.fontWeight.bold};
    }

    select {
        margin-right: 22px;
        font-size: 16px;
        border: 1px solid ${({ theme }) => theme.color.gray300};
        border-radius: 10px;
        outline: none;
        width: 100px;
        height: 30px;
        padding: 0 10px;
    }
`;
