import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {
        const { name, value, type, files } = target;

        if (type === "file") {
            setValues({
                ...values,
                [name]: files[0], // Solo guarda un archivo si no se espera un array
            });
        } else {
            setValues({
                ...values,
                [name]: value.toUpperCase(),
            });
        }
    };

    return [values, handleInputChange, reset];
};
