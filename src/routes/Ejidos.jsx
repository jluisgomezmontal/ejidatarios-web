import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "../hooks/useForm.jsx";
import { useState } from "react";
import Swal from "sweetalert2";
import { TERRENO } from "../utils/const.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
const initialForm = {
  iD_Ejidatario: "",
  tipoCertificado: "",
  numeroParcela: "",
  numeroCertificado: "",
  actoJuridico: "",
  documentoPDF: "",
  parcelaOrigen: "",
  porcentaje: "",
};
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { VisuallyHiddenInput } from "../styles/index.js";
export const Ejidos = () => {
  const [formValues, handleInputChange, reset, agregarPropietario] =
    useForm(initialForm);
  const [ejidatario, setEjidatario] = useState({});
  const [origen, setOrigen] = useState({});

  const handleIdentificar = async (event) => {
    event.preventDefault();
    try {
      const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.iD_Ejidatario}`;
      const response = await fetch(url);
      const data = await response.json();
      setEjidatario(data);
      agregarPropietario(data._id);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://ejidatarios-api.onrender.com/api/terrenos`;
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await fetch(url, {
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
      setEjidatario({});
      setOrigen({});
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };
  const handleOrigen = async (e) => {
    try {
      e.preventDefault();
      const url = `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${formValues.parcelaOrigen}`;
      const response = await fetch(url);
      const data = await response.json();
      agregarPropietario(data[data.length - 1].propietario._id, true);
      setOrigen(data[data.length - 1]);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setOrigen({ error: "error" });
    }
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="text-center my-4 fs-1 text-info ">Agregar Parcela</h2>

      <form onSubmit={handleIdentificar}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                required
                label={TERRENO.idSujeto}
                name="iD_Ejidatario"
                value={formValues.iD_Ejidatario}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid xs={12} md={2} sx={{ alignContent: "center" }}>
              <Button type="submit" variant="contained">
                Identificar Sujeto
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ alignContent: "center" }}>
              {ejidatario?.nombre ? (
                <Button
                  size="large"
                  variant="outlined"
                  color="success"
                  startIcon={<Person2OutlinedIcon />}
                >
                  {`${ejidatario.nombre} ${ejidatario.apellidoPaterno} ${ejidatario.apellidoMaterno}`}
                </Button>
              ) : (
                ejidatario?.error === "Ejidatario no encontrado" && (
                  <Button
                    size="large"
                    variant="outlined"
                    color="error"
                    startIcon={<ErrorOutlineIcon />}
                  >
                    Ejidatario no encontrado
                  </Button>
                )
              )}
            </Grid>
          </Grid>
        </Box>
      </form>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <FormControl fullWidth>
                <InputLabel required>{TERRENO.tipoCertificado}</InputLabel>
                <Select
                  name="tipoCertificado"
                  value={formValues.tipoCertificado}
                  onChange={handleInputChange}
                  label={TERRENO.tipoCertificado}
                  required
                >
                  <MenuItem value="PARCELARIO">1.-Parcelario</MenuItem>
                  <MenuItem value="POSESION">2.-Posesión</MenuItem>
                  <MenuItem value="USO COMUN">3.-Uso Común</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={6}>
              {formValues.tipoCertificado === "PARCELARIO" ? (
                <TextField
                  fullWidth
                  required
                  label={TERRENO.numeroParcela}
                  name="numeroParcela"
                  value={formValues.numeroParcela}
                  onChange={handleInputChange}
                />
              ) : (
                formValues.tipoCertificado === "USO COMUN" && (
                  <TextField
                    fullWidth
                    required
                    label={TERRENO.porcentaje}
                    name="porcentaje"
                    value={formValues.porcentaje}
                    onChange={handleInputChange}
                  />
                )
              )}
            </Grid>
            {formValues.tipoCertificado === "POSESION" && (
              <>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    required
                    label={TERRENO.parcelaOrigen}
                    name="parcelaOrigen"
                    value={formValues.parcelaOrigen}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} md={2} sx={{ alignContent: "center" }}>
                  <Button variant="contained" onClick={handleOrigen}>
                    Identificar Parcela
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }} sx={{ alignContent: "center" }}>
                  {origen?.propietario?.nombre !== undefined ? (
                    <Button
                      size="large"
                      variant="outlined"
                      color="info"
                      startIcon={<Person2OutlinedIcon />}
                    >
                      {origen?.propietario.nombre}{" "}
                      {origen?.propietario.apellidoPaterno}{" "}
                      {origen?.propietario.apellidoMaterno}
                    </Button>
                  ) : (
                    origen?.error && (
                      <Button
                        size="large"
                        variant="outlined"
                        color="error"
                        startIcon={<ErrorOutlineIcon />}
                      >
                        Propietario no encontrado
                      </Button>
                    )
                  )}
                </Grid>
              </>
            )}
            <Grid size={{ xs: 6, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel required>{TERRENO.actoJuridico}</InputLabel>
                <Select
                  name="actoJuridico"
                  required
                  value={formValues.actoJuridico}
                  onChange={handleInputChange}
                  label={TERRENO.actoJuridico}
                >
                  <MenuItem value={""}>Seleccione una opcion</MenuItem>
                  <MenuItem value="ADDAT">1.-ADDAT</MenuItem>
                  <MenuItem value="ENAJENACION">2.-AJENACION</MenuItem>
                  <MenuItem value="SENTENCIA">3.-SENTENCIA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                fullWidth
                required
                label={
                  formValues.tipoCertificado === "POSESION"
                    ? "Folio"
                    : formValues.tipoCertificado === "USO COMUN"
                    ? "Certificado Compartido"
                    : TERRENO.numeroCertificado
                }
                name="numeroCertificado"
                value={formValues.numeroCertificado}
                onChange={handleInputChange}
              />
            </Grid>
            {formValues.tipoCertificado === "POSESION" && (
              <Grid size={12}>
                <Button
                  component="label"
                  role={undefined}
                  color="secondary"
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Subir Documentos
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleInputChange}
                    name="documentoPDF"
                  />
                </Button>
              </Grid>
            )}

            <Grid xs={12}>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
