import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Swal from "sweetalert2";

export const Users = () => {
  const [usuarios, setUsuarios] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

  // Estados para modal y formulario
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    telefono: "",
    isAdmin: false,
    password: "",
  });
  console.log(formData);
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(
        "https://ejidatarios-api.onrender.com/api/usuarios"
      );
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    setLoadingDelete(id);
    try {
      const res = await fetch(
        `https://ejidatarios-api.onrender.com/api/usuarios/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Error al eliminar el usuario");
      }

      setUsuarios((prev) => prev.filter((u) => u._id !== id));

      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "El usuario fue eliminado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario.",
      });
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    if (loadingSave) return; // evitar cerrar mientras guarda
    setOpenModal(false);
    setFormData({ name: "", telefono: "", isAdmin: false, password: "" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingSave(true);
    try {
      const res = await fetch(
        "https://ejidatarios-api.onrender.com/api/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            isAdmin: !!formData.isAdmin,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al guardar usuario");
      }

      await fetchUsuarios();
      handleCloseModal();

      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        text: "El usuario se registró correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Hubo un error al guardar el usuario",
      });
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 5 }} color="primary" gutterBottom textAlign="right">
        Usuarios
      </Typography>
      {/* Icono para agregar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton
          color="primary"
          onClick={handleOpenModal}
          aria-label="Agregar usuario"
          size="large"
        >
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
          Lista de Usuarios
        </Typography>
      </Box>

      {usuarios === null ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3}>
          <List>
            {usuarios.map((usuario, index) => (
              <React.Fragment key={usuario._id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleDelete(usuario._id)}
                      disabled={loadingDelete === usuario._id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <ListItemText
                      primary={usuario.name}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Teléfono: {usuario.telefono}
                        </Typography>
                      }
                    />
                    <Chip
                      label={usuario.isAdmin ? "Administrador" : "Usuario"}
                      color={usuario.isAdmin ? "primary" : "default"}
                      sx={{ ml: 2 }}
                    />
                  </Box>
                </ListItem>
                {index < usuarios.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Modal para agregar usuario */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="text"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  name="isAdmin"
                  color="primary"
                />
              }
              label="Administrador"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled={loadingSave}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loadingSave}
          >
            {loadingSave ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
