import { useLocation, useNavigate } from "react-router-dom";
import useOrderStore from "hooks/useOrderStore";

const PayCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setPaymentKey } = useOrderStore();

    // URLSearchParams를 이용해 쿼리 파라미터 추출
    const searchParams = new URLSearchParams(location.search);
    const paymentKey = searchParams.get("paymentKey");

    setPaymentKey(paymentKey);

    navigate("/orderRequest", { replace: true });
};
export default PayCallback;
