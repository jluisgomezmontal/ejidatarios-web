import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "../hooks/useForm.jsx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TERRENO } from "../utils/const.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { VisuallyHiddenInput } from "../styles/index.js";
import { CheckCircleOutline } from "@mui/icons-material";

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

export const Ejidos = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange, reset, agregarPropietario] =
    useForm(initialForm);
  const [ejidatario, setEjidatario] = useState({});
  const [origen, setOrigen] = useState({});
  const [identificar, setIdentificar] = useState(false);
  const [sujeto, setSujeto] = useState(false);

  const handleIdentificar = async (e) => {
    e.preventDefault();
    setSujeto(true);
    try {
      const res = await fetch(
        `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.iD_Ejidatario}`
      );
      const data = await res.json();
      if (data.error) {
        setSujeto(false);
        setEjidatario({ error: data.error });
        return;
      }
      setEjidatario(data);
      agregarPropietario(data._id);
    } catch (err) {
      console.error("Error al identificar sujeto:", err.message);
      setSujeto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch(
        `https://ejidatarios-api.onrender.com/api/terrenos`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      Swal.fire({
        icon: data.msg ? "success" : "error",
        title: data.msg || "Error en el formulario",
        timer: 1800,
      });

      reset();
      setEjidatario({});
      setOrigen({});
    } catch (err) {
      console.error("Error al guardar terreno:", err.message);
    } finally {
      setLoading(false);
      setSujeto(false);
      setIdentificar(false);
    }
  };

  const handleOrigen = async (e) => {
    e.preventDefault();
    setIdentificar(true);
    try {
      const res = await fetch(
        `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${formValues.parcelaOrigen}`
      );
      const data = await res.json();

      const propietario = data.at(-1)?.propietario;
      if (!propietario) throw new Error("Propietario no encontrado");

      agregarPropietario(propietario._id, true);
      setOrigen(data.at(-1));
    } catch (err) {
      console.error("Error al identificar parcela:", err.message);
      setOrigen({ error: "Propietario no encontrado" });
      setIdentificar(false);
    }
  };

  const validarFormulario = () => {
    if (!sujeto) {
      Swal.fire({ icon: "error", title: "Identifique el Sujeto", timer: 1800 });
      return false;
    }
    if (!identificar) {
      Swal.fire({
        icon: "error",
        title: "Identifique la Parcela",
        timer: 1800,
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    setIdentificar(formValues.tipoCertificado !== "POSESION");
  }, [formValues.tipoCertificado]);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3" color="primary" textAlign="center"  sx={{mb:5}}>Agregar Parcela</Typography>

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
                <Grid size={{ xs: 12, md: 3 }}>
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
                  <MenuItem value="ENAJENACION">2.-ENAJENACION</MenuItem>
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
                {formValues.documentoPDF.name !== undefined && (
                  <Alert
                    sx={{ mt: 3 }}
                    icon={<CheckCircleOutline fontSize="inherit" />}
                    severity="success"
                  >
                    Documento subido con exito nombre del archivo:
                    {" " + formValues.documentoPDF.name}
                  </Alert>
                )}
              </Grid>
            )}

            <Grid xs={12} sx={{mt:3}}>
              <Button
                disabled={loading}
                loading={loading}
                loadingPosition="start"
                type="submit"
                variant="contained"
                color="success"
              >
                Crear Terreno
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};
