import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const agregarPropietario = (propietario, propietarioOrigen = false) => {
    setValues({
      ...values,
      propietario,
    })
    propietarioOrigen &&
    setValues({
      ...values,
      propietarioOrigen : propietario,
    })
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
      if (value === "PARCELARIO") {
        setValues({
          ...values,
          [name]: value.toUpperCase(),
          parcelaOrigen: "",
        });
      }
      if (value === "POSESION") {
        setValues({
          ...values,
          [name]: value.toUpperCase(),
          numeroParcela: "",
        });
      }
      if (value === "USO COMUN") {
        setValues({
          ...values,
          [name]: value.toUpperCase(),
          numeroParcela: "",
          parcelaOrigen: "",
        });
      }
    }
  };

  return [values, handleInputChange, reset, agregarPropietario];
};
