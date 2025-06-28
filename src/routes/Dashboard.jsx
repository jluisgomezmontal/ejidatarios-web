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

export const Dashboard = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [terrenosData, setTerrenosData] = useState([]);
  const [usuariosCount, setUsuariosCount] = useState(null);
  const [terrenosCount, setTerrenosCount] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

console.log({isDarkMode})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await fetch(
          "https://ejidatarios-api.onrender.com/api/ejidatarios"
        );
        const usuarios = await resUsuarios.json();
        setUsuariosData(usuarios);
        setUsuariosCount(usuarios.length);

        const resTerrenos = await fetch(
          "https://ejidatarios-api.onrender.com/api/terrenos"
        );
        const terrenos = await resTerrenos.json();
        console.log(terrenos)
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

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {" "}
      <Typography variant="h5" sx={{ mb: 5 }} gutterBottom textAlign="right">
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Tarjeta de Total */}
        <Grid item xl={12} xs={12} sm={4}>
          <Card sx={{  backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <SummarizeIcon
              sx={{ fontSize: 40, color: "warning.main", mr: 2 }}
            />
            <CardContent>
              <Typography variant="h6">Total de registros</Typography>
              {usuariosCount === null || terrenosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{total}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Tarjeta de Usuarios */}
        <Grid item xl={12} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Total de sujetos</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosCount}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Ejidatarios</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosData.filter(u=> u.calidadAgraria ==="EJIDATARIO").length}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">AVECINDADOS</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosData.filter(u=> u.calidadAgraria ==="AVECINDADO").length}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Posesionario de derecho</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosData.filter(u=> u.calidadAgraria ==="POSESIONARIO DE DERECHO").length}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Posesionario de hecho</Typography>
              {usuariosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{usuariosData.filter(u=> u.calidadAgraria ==="POSESIONARIO DE HECHO").length}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Tarjeta de Terrenos */}
        <Grid item xl={12} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <MapIcon sx={{ fontSize: 40, color: "success.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Total terrenos</Typography>
              {terrenosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{terrenosCount}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <MapIcon sx={{ fontSize: 40, color: "success.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Posesiones</Typography>
              {terrenosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{terrenosData.filter(u=> u.tipoCertificado ==="POSESION").length}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12} sm={4}>
          <Card sx={{ backgroundColor: isDarkMode ? "#292929" : "#e5eafc", minHeight:"180px", display: "flex", alignItems: "center", p: 2 }}>
            <MapIcon sx={{ fontSize: 40, color: "success.main", mr: 2 }} />
            <CardContent>
              <Typography variant="h6">Parcelas</Typography>
              {terrenosCount === null ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h4">{terrenosData.filter(u=> u.tipoCertificado ==="PARCELARIO").length}</Typography>
              )}
            </CardContent>
          </Card>
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
