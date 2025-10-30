import { useDispatch } from "react-redux";
import { setRecientes } from "../redux/loginSlice";


export const useRecientes =()=> {
    const dispatch = useDispatch();
    const handleRecientes = (e) => {
        dispatch(setRecientes(e));
    }
    
    return {
        handleRecientes
    }
}