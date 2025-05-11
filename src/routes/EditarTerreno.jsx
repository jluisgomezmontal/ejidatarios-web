import { useForm } from "../hooks/useForm.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../styles/index.js";

import {
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { BOTONES, TERRENO } from "../utils/const.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export const EditarTerrenos = () => {
  let navigate = useNavigate();
  const [origen, setOrigen] = useState({});
  const location = useLocation();
  const params = useParams();
  const [terreno, setTerreno] = useState(location.state);
  const [formValues, handleInputChange, reset, agregarPropietario] =
    useForm(terreno);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEjidatarios = `https://ejidatarios-api.onrender.com/api/terrenos/${terreno._id}`;

      // Crear FormData correctamente
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (key === "propietario") {
          formData.append(key, value._id);
        } else {
          formData.append(key, value);
        }
      });
      // No se usa "Content-Type" con FormData
      const response = await axios.put(apiEjidatarios, formData);

      Swal.fire({
        icon: response.data.msg ? "success" : "error",
        title: response.data.msg || "Error en el formulario",
        showConfirmButton: false,
        timer: 1800,
      });

      params.ID === undefined && reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar los datos",
        text: error.message,
      });
    }
  };
  const handleIdentificar = async (event) => {
    event.preventDefault();
    try {
      const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.iD_Ejidatario}`;
      const response = await fetch(url);
      const data = await response.json();
      setTerreno(data);
      agregarPropietario(data._id, false);
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
      agregarPropietario(data.propietario._id, true);
      setOrigen(data);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setOrigen({ error: "error" });
    }
  };
  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="text-center my-4 fs-1 text-info ">Editar Parcela</h2>

      <form onSubmit={handleIdentificar}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                required
                disabled
                label={TERRENO.idSujeto}
                name="iD_Ejidatario"
                value={formValues.iD_Ejidatario}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ alignContent: "center" }}>
              {terreno?.nombre || terreno.propietario.nombre ? (
                <Button
                  size="large"
                  variant="outlined"
                  color="success"
                  startIcon={<Person2OutlinedIcon />}
                >
                  {`${terreno.nombre ?? terreno.propietario.nombre} ${
                    terreno.apellidoPaterno ??
                    terreno.propietario.apellidoPaterno
                  } ${
                    terreno.apellidoMaterno ??
                    terreno.propietario.apellidoMaterno
                  }`}
                </Button>
              ) : (
                terreno?.error === "Ejidatario no encontrado" && (
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
                <InputLabel>{TERRENO.tipoCertificado}</InputLabel>
                <Select
                  name="tipoCertificado"
                  value={formValues.tipoCertificado}
                  onChange={handleInputChange}
                  label={TERRENO.tipoCertificado}
                >
                  <MenuItem value="">Seleccione una opción</MenuItem>
                  <MenuItem value="PARCELARIO">Parcelario</MenuItem>
                  <MenuItem value="POSESION">Posesión</MenuItem>
                  <MenuItem value="USO COMUN">Uso Común</MenuItem>
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
                      color="success"
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
                <InputLabel>{TERRENO.actoJuridico}</InputLabel>
                <Select
                  name="actoJuridico"
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
            <Grid xs={12}>
              <div className="d-flex gap-2 my-4">
                <Button
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={handleSubmit}
                >
                  {BOTONES.editarEjidatario}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<CancelIcon />}
                  onClick={async () => {
                    Swal.fire({
                      title: BOTONES.cancelar,
                      icon: "info",
                      confirmButtonColor: "#0d6efd",
                      timer: 1500,
                    });
                    navigate("/");
                  }}
                >
                  {BOTONES.cancelarEdicion}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
