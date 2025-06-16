import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map"; // Icono representativo de terrenos

export const Dashboard = () => {
  const [usuariosCount, setUsuariosCount] = useState(null);
  const [terrenosCount, setTerrenosCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await fetch(
          "https://ejidatarios-api.onrender.com/api/ejidatarios"
        );
        const usuarios = await resUsuarios.json();
        setUsuariosCount(usuarios.length);

        const resTerrenos = await fetch(
          "https://ejidatarios-api.onrender.com/api/terrenos"
        );
        const terrenos = await resTerrenos.json();
        setTerrenosCount(terrenos.length);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setUsuariosCount(0);
        setTerrenosCount(0);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {/* Tarjeta de Usuarios */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Ejidatarios</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosCount}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de Terrenos */}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <MapIcon sx={{ fontSize: 40, color: "success.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Terrenos</Typography>
              {terrenosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{terrenosCount}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
