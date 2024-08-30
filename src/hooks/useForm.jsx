import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    };

    const handleInputChange = ({ target }) => {
        const { name, value, type, checked } = target;

        if (type === "checkbox") {
            setValues((prevValues) => {
                const selectedValues = prevValues[name] || [];

                if (checked) {
                    return { ...prevValues, [name]: [...selectedValues, value] };
                } else {
                    return { ...prevValues, [name]: selectedValues.filter((item) => item !== value) };
                }
            });
        } else {
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    return [values, handleInputChange, reset];
};
