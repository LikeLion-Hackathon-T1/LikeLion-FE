import { useNavigate } from "react-router-dom";
import createSyluvAxios from "../utils/syluvAxios";

const useSyluvAxios = () => {
    const navigate = useNavigate();
    const axiosInstance = createSyluvAxios(navigate);
    return axiosInstance;
};

export default useSyluvAxios;
