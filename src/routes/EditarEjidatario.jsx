import { useForm } from "../hooks/useForm.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOTONES, EJIDATARIO } from "../utils/const.js";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../styles/index.js";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";

export const EditarEjidatarios = () => {
  const user = useSelector((state) => state.login.user);
  let navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [ejidatario] = useState(location.state);
  const [formValues, handleInputChange, reset] = useForm(ejidatario);

  useEffect(() => {
    reset(); // Actualiza los valores del formulario cuando ejidatario cambie
  }, [ejidatario]); // Se ejecuta cuando se actualiza el estado de ejidatario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEjidatarios = `https://ejidatarios-api.onrender.com/api/ejidatarios/${ejidatario._id}`;

      // Crear FormData correctamente
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // No se usa "Content-Type" con FormData
      formData.delete("creadoPor");
      formData.delete("actualizadoPor");
      formData.append("actualizadoPor", user._id); // ✅ Aquí agregas el ID del usuario
      const response = await axios.put(apiEjidatarios, formData);

      Swal.fire({
        icon: response.data.msg ? "success" : "error",
        title: response.data.msg || "Error en el formulario",
        showConfirmButton: false,
        timer: 1800,
      });
      navigate("/");
      params.ID === undefined && reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar los datos",
        text: error.message,
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-center my-4 fs-1 text-info ">
        Editar Sujeto Agrario
      </h2>

      <Box component="form" sx={{ flexGrow: 1 }} noValidate autoComplete="off">
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={12}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">
                Calidad Agraria
              </InputLabel>
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
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
                  4.-POSESIONARIO DE DERECHO{" "}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              autoComplete="off"
              placeholder={EJIDATARIO.id}
              value={formValues.iD_Ejidatario}
              onChange={handleInputChange}
              name="iD_Ejidatario"
              label="ID Ejidatario"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              sx={{ width: "100%" }}
              placeholder={EJIDATARIO.nombre}
              value={formValues.nombre}
              onChange={handleInputChange}
              name="nombre"
              label={EJIDATARIO.nombre}
              variant="outlined"
            />
          </Grid>

          <Grid size={6}>
            <TextField
              sx={{ width: "100%" }}
              autoComplete="nope"
              placeholder={EJIDATARIO.apellidoPaterno}
              value={formValues.apellidoPaterno}
              label={EJIDATARIO.apellidoPaterno}
              onChange={handleInputChange}
              name="apellidoPaterno"
              variant="outlined"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              autoComplete="nope"
              placeholder={EJIDATARIO.apellidoMaterno}
              label={EJIDATARIO.apellidoMaterno}
              value={formValues.apellidoMaterno}
              onChange={handleInputChange}
              name={"apellidoMaterno"}
              sx={{ width: "100%" }}
              variant="outlined"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              autoComplete="off"
              placeholder={EJIDATARIO.telefono}
              label={EJIDATARIO.telefono}
              value={formValues.telefono}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              name="telefono"
            />
          </Grid>
          <Grid size={6}>
            <TextField
              autoComplete="off"
              placeholder={EJIDATARIO.curp}
              label={EJIDATARIO.curp}
              sx={{ width: "100%" }}
              value={formValues.curp}
              onChange={handleInputChange}
              name="curp"
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
              Subir Curp
              <VisuallyHiddenInput
                type="file"
                onChange={handleInputChange}
                name="documentoPDF"
              />
            </Button>
          </Grid>
          <Grid size={12}>
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
    </div>
  );
};
