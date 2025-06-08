import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Alert,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "../hooks/useForm.jsx";
import { VisuallyHiddenInput } from "../styles/index.js";
import { EJIDATARIO } from "../utils/const.js";
import LaunchIcon from "@mui/icons-material/Launch";
import { CheckCircleOutline } from "@mui/icons-material";
import { useState } from "react";

export const Ejidatarios = () => {
  const [loading, setLoading] = useState(false)
  const initialForm = {
    calidadAgraria: "",
    iD_Ejidatario: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    curp: "",
    documentoPDF: "",
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(!loading)
      const apiEjidatarios =
        "https://ejidatarios-api.onrender.com/api/ejidatarios/";
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(apiEjidatarios, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      Swal.fire({
        icon: data.msg ? "success" : "error",
        title: data.msg || "Error en el formulario",
        showConfirmButton: false,
        timer: 1800,
      });
      reset();
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    } finally{
      setLoading(!loading)
    }
  };

  return (
    <div>
      <h2 className="text-center my-4 fs-1 text-info ">
        Agregar Sujeto Agrario
      </h2>
      <form onSubmit={handleSubmit}>
        <Box autoComplete="off">
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label" required>
                  Calidad Agraria
                </InputLabel>
                <Select
                  label="Calidad Agraria"
                  required
                  value={formValues.calidadAgraria}
                  onChange={handleInputChange}
                  name="calidadAgraria"
                >
                  <MenuItem value="EJIDATARIO">1.-EJIDATARIO</MenuItem>
                  <MenuItem value="AVECINDADO">2.-AVECINDADO</MenuItem>
                  <MenuItem value="POSESIONARIO DE HECHO">
                    3.-POSESIONARIO DE HECHO
                  </MenuItem>
                  <MenuItem value="POSESIONARIO DE DERECHO">
                    4.-POSESIONARIO DE DERECHO
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {[
              { name: "iD_Ejidatario", label: "ID Ejidatario" },
              { name: "nombre", label: "Nombre" },
              { name: "apellidoPaterno", label: "Apellido Paterno" },
              { name: "apellidoMaterno", label: "Apellido Materno" },
              { name: "telefono", label: "Teléfono" },
              { name: "curp", label: "CURP" },
            ].map((field, index) => (
              <Grid key={index} size={6}>
                <TextField
                  required
                  sx={{ width: "100%" }}
                  placeholder={EJIDATARIO[field.name]}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                  name={field.name}
                  label={field.label}
                  variant="outlined"
                />
                {field.name === "curp" && (
                  <FormHelperText id="my-helper-text" className="mt-2">
                    <a
                      className="link text-capitalize"
                      href="https://www.gob.mx/curp/"
                    >
                      Consultar curp
                      <LaunchIcon className="fs-6" />
                    </a>
                  </FormHelperText>
                )}
              </Grid>
            ))}
            <Grid size={12}>
              <Button
                component="label"
                role={undefined}
                color="secondary"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Subir INE
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleInputChange}
                  name="documentoPDF"
                />
              </Button>
              {
                formValues.documentoPDF.name !== undefined &&
                <Alert sx={{mt:3}} icon={<CheckCircleOutline fontSize="inherit" />} severity="success">
                Documento subido con exito nombre del archivo:{" " +formValues.documentoPDF.name}
              </Alert>
              }
            </Grid>
            <Grid size={12}>
              <Button disabled={loading}           loading={loading}     
          loadingPosition="start"
 variant="contained" endIcon={<SendIcon />} type="submit">
                Crear Ejidatario
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
