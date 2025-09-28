import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "../hooks/useForm.jsx";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { EjidatarioTable } from "../components/EjidatarioTable.jsx";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
export const Buscar = () => {
  const initialForm = {
    metodoDeBusqueda: "",
    valor: "",
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const [resultado, setResultado] = useState({});
  const { recientes } = useSelector((state) => state.login);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let url;
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
    } else if (formValues.metodoDeBusqueda === "NOMBRE") {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios/search?q=${formValues.valor}`;
    } else {
      url = `https://ejidatarios-api.onrender.com/api/ejidatarios`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setResultado(data);
  };

  console.log(formValues);
  return (
    <div style={{ padding: "2rem" }}>
      <Typography
        variant="h3"
        color="primary"
        textAlign="center"
        sx={{ mb: 5 }}
      >
        Buscar en el Ejido
      </Typography>
{recientes.length !== 0 &&
 <><Typography
        variant="overline"
        color="primary"
        textAlign="center"
        sx={{ display: "block", width: "100%" }}
      >
        Busquedas recientes
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            mb: 3,
          },
        }}
      >
        <ButtonGroup color="secondary" aria-label="Medium-sized button group">
          {recientes?.map((r) => (
            <Button
              key={r.ejidatario}
              component={RouterLink} // 👈 usa el Link de react-router-dom
              to={`/perfil/${r.ejidatario}`} // 👈 ruta
            >
              {r.nombre}
            </Button>
          ))}
        </ButtonGroup>
      </Box></>
}

      <Box
        component="form"
        sx={{ flexGrow: 1 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
                <MenuItem value="NOMBRE">1.-Nombre o Apellido</MenuItem>
                <MenuItem value="ID">2.-ID</MenuItem>
                <MenuItem value="NUMEROPARCELA">3.-Numero de Parcela</MenuItem>
                <MenuItem value="CURP">4.-CURP</MenuItem>
                <MenuItem value="NUMEROCERTIFICADO">
                  5.-Numero de Certificado
                </MenuItem>
                <MenuItem value="PARCELAORIGEN">6.-Parcela de Origen</MenuItem>
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
              label="Valor de busqueda"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleSubmit}
              type="submit"
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4" color="primary" textAlign="left" sx={{ my: 5 }}>
        Resultados
      </Typography>

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
