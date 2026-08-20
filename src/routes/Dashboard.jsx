import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import SummarizeIcon from "@mui/icons-material/Summarize"; // Icono para total
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { API_URL } from "../utils/const.js";

export const Dashboard = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [terrenosData, setTerrenosData] = useState([]);
  const [usuariosCount, setUsuariosCount] = useState(null);
  const [terrenosCount, setTerrenosCount] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await fetch(
          `${API_URL}/api/ejidatarios`
        );
        const usuarios = await resUsuarios.json();
        setUsuariosData(usuarios);
        setUsuariosCount(usuarios.length);

        const resTerrenos = await fetch(
          `${API_URL}/api/terrenos`
        );
        const terrenos = await resTerrenos.json();
        setTerrenosData(terrenos);
        setTerrenosCount(terrenos.length);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setUsuariosCount(0);
        setTerrenosCount(0);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = (type) => {
    let data = [];

    if (type === "usuarios") {
      data = usuariosData.map((u) => ({
        iD_Ejidatario: u.iD_Ejidatario,
        nombre: u.nombre,
        apellidoPaterno: u.apellidoPaterno,
        apellidoMaterno: u.apellidoMaterno,
        calidadAgraria: u.calidadAgraria,
        telefono: u.telefono,
        curp: u.curp,
      }));
    } else {
      data = terrenosData.map((t) => ({
        numeroParcela: t.numeroParcela,
        tipoCertificado: t.tipoCertificado,
        actoJuridico: t.actoJuridico,
        numeroCertificado: t.numeroCertificado,
        parcelaOrigen: t.parcelaOrigen,
        iD_Ejidatario: t.iD_Ejidatario,
        propietario_nombre: t.propietario?.nombre,
        propietario_apellidoPaterno: t.propietario?.apellidoPaterno,
        propietario_apellidoMaterno: t.propietario?.apellidoMaterno,
        propietario_calidadAgraria: t.propietario?.calidadAgraria,
        propietarioOrigen_nombre: t.propietarioOrigen?.nombre,
        propietarioOrigen_apellidoPaterno: t.propietarioOrigen?.apellidoPaterno,
        propietarioOrigen_apellidoMaterno: t.propietarioOrigen?.apellidoMaterno,
        propietarioOrigen_calidadAgraria: t.propietarioOrigen?.calidadAgraria,
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileName = `${type}-${new Date().toISOString().slice(0, 10)}.xlsx`;
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, fileName);
  };

  const total = (usuariosCount ?? 0) + (terrenosCount ?? 0);

  const StatCard = ({ icon, title, value, color = "primary.main", loading }) => (
    <Card
      sx={{
        backgroundColor: isDarkMode ? "#292929" : "#e5eafc",
        minHeight: "180px",
        display: "flex",
        alignItems: "center",
        p: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {icon && <Box sx={{ fontSize: 40, color, mr: 2 }}>{icon}</Box>}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h4">{value}</Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4 }} fontWeight="bold">
        Dashboard
      </Typography>

      {/* Resumen General */}
      <Typography variant="h6" sx={{ mb: 2 }} color="text.secondary">
        Resumen General
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<SummarizeIcon />}
            title="Total de registros"
            value={total}
            color="warning.main"
            loading={usuariosCount === null || terrenosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<PeopleIcon />}
            title="Total de sujetos"
            value={usuariosCount}
            loading={usuariosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            icon={<MapIcon />}
            title="Total terrenos"
            value={terrenosCount}
            color="success.main"
            loading={terrenosCount === null}
          />
        </Grid>
      </Grid>

      {/* Sujetos por Calidad Agraria */}
      <Typography variant="h6" sx={{ mb: 2 }} color="text.secondary">
        Sujetos por Calidad Agraria
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Ejidatarios"
            value={
              usuariosData.filter((u) => u.calidadAgraria === "EJIDATARIO")
                .length
            }
            loading={usuariosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Avecindados"
            value={
              usuariosData.filter((u) => u.calidadAgraria === "AVECINDADO")
                .length
            }
            loading={usuariosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Posesionario de derecho"
            value={
              usuariosData.filter(
                (u) => u.calidadAgraria === "POSESIONARIO DE DERECHO"
              ).length
            }
            loading={usuariosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PeopleIcon />}
            title="Posesionario de hecho"
            value={
              usuariosData.filter(
                (u) => u.calidadAgraria === "POSESIONARIO DE HECHO"
              ).length
            }
            loading={usuariosCount === null}
          />
        </Grid>
      </Grid>

      {/* Terrenos por Tipo */}
      <Typography variant="h6" sx={{ mb: 2 }} color="text.secondary">
        Terrenos por Tipo de Certificado
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <StatCard
            icon={<MapIcon />}
            title="Posesiones"
            value={
              terrenosData.filter((t) => t.tipoCertificado === "POSESION")
                .length
            }
            color="success.main"
            loading={terrenosCount === null}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatCard
            icon={<MapIcon />}
            title="Parcelas"
            value={
              terrenosData.filter((t) => t.tipoCertificado === "PARCELARIO")
                .length
            }
            color="success.main"
            loading={terrenosCount === null}
          />
        </Grid>
      </Grid>
      {/* Botones de Exportación */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => exportToExcel("usuarios")}
        >
          Descargar Ejidatarios
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => exportToExcel("terrenos")}
        >
          Descargar Terrenos
        </Button>
      </Stack>
    </Box>
  );
};
