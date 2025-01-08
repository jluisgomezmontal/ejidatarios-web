import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "../hooks/useForm.jsx";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { EjidatarioTable } from "../components/EjidatarioTable.jsx";

export const Buscar = () => {
  const initialForm = {
    metodoDeBusqueda: "",
    valor: "220690",
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const [resultado, setResultado] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let url;
    console.log(formValues);
    if (formValues.metodoDeBusqueda === "ID") {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.valor}`;
    } else if (formValues.metodoDeBusqueda === "CURP") {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios/curp/${formValues.valor}`;
    } else if (formValues.metodoDeBusqueda === "TELEFONO") {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios/telefono/${formValues.valor}`;
    } else if (formValues.metodoDeBusqueda === "NUMEROPARCELA") {
      url = `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${formValues.valor}`;
    } else if (formValues.metodoDeBusqueda === "NUMEROCERTIFICADO") {
      url = `https://ejidatarios-api.onrender.com/api/terrenos/certificado/${formValues.valor}`;
    } else if (formValues.metodoDeBusqueda === "PARCELAORIGEN") {
      url = `https://ejidatarios-api.onrender.com/api/terrenos/origen/${formValues.valor}`;
    } else {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setResultado(data);
  };
  return (
    <div className="vh-100">
      <h2 className="text-center my-4 fs-1 text-info ">
        Agregar Sujeto Agrario
      </h2>

      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                ¿Metodo de busqueda?
              </InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="¿Metodo de busqueda?"
                value={formValues.metodoDeBusqueda}
                onChange={handleInputChange}
                name="metodoDeBusqueda"
              >
                <MenuItem value="ID">1.-ID</MenuItem>
                <MenuItem value="CURP">2.-CURP</MenuItem>
                <MenuItem value="NUMEROPARCELA">3.-Numero de Parcela</MenuItem>
                <MenuItem value="NUMEROCERTIFICADO">
                  4.-Numero de Certificado
                </MenuItem>
                <MenuItem value="PARCELAORIGEN">5.-Parcela de Origen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              autoComplete="off"
              placeholder="Buscar"
              value={formValues.valor}
              onChange={handleInputChange}
              name="valor"
              label="ID Ejidatario"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleSubmit}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <h2 className="my-5 fs-2 text-light ">Resultados</h2>

      {(resultado?.iD_Ejidatario || Array.isArray(resultado)) && (
        <EjidatarioTable resultado={resultado} />
      )}
      {(resultado?.error || resultado === null) && (
        <Alert variant="danger" text={"dark"}>
          No se encontraron datos
        </Alert>
      )}
    </div>
  );
};
