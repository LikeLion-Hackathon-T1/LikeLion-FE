import useSyluvAxios from "hooks/useSyluvAxios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QRredirection = () => {
    const { marketId, storeId } = useParams();
    const syluvAxios = useSyluvAxios();
    const navigate = useNavigate();
    useEffect(() => {
        syluvAxios.post(`/home/${storeId}/qrvisit`).finally(() => {
            navigate(`/market/${marketId}/${storeId}`, {
                replace: true,
            });
        });
    }, [marketId, storeId, syluvAxios, navigate]);
    return <div></div>;
};

export default QRredirection;
