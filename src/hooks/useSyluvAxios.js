import { useNavigate } from "react-router-dom";
import CreateSyluvAxios from "utils/syluvAxios";

const useSyluvAxios = () => {
    const navigate = useNavigate();
    const axiosInstance = CreateSyluvAxios(navigate);
    return axiosInstance;
};

export default useSyluvAxios;
