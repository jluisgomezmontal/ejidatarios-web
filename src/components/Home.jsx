import comisaria from "../assets/comisaria.webp";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 320, md: 460 },
          display: "flex",
          alignItems: "left",
          color: "#fff",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${comisaria})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Ejido de San Marcos Guerrero
            </Typography>
           
           
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 10 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                component={RouterLink}
                to="/buscar"
              >
                Buscar en el Ejido
              </Button>
             
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Secciones de información */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: "100%",
                bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.50' : 'background.paper'
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InfoOutlinedIcon color="primary" />
                  <Typography variant="h6">Comisariado</Typography>
                </Stack>
                <Typography variant="body1">
                  Representación actual del Ejido de San Marcos Guerrero.
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Comisariado Ejidal:
                </Typography>
                <Typography variant="body1">Mario Vazquez Agaton</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: "100%",
                bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.50' : 'background.paper'
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessTimeOutlinedIcon color="primary" />
                  <Typography variant="h6">Periodo</Typography>
                </Stack>
                <Typography variant="body1">Administración 2024–2027</Typography>
                <Typography variant="body2" color="text.secondary">
                  Compromiso con la transparencia, la atención y la gestión del
                  patrimonio ejidal.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3, 
                height: "100%",
                bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.50' : 'background.paper'
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnOutlinedIcon color="primary" />
                  <Typography variant="h6">Ubicación y horarios</Typography>
                </Stack>
                <Typography variant="body1">San Marcos, Guerrero</Typography>
                <Typography variant="body2" color="text.secondary">
                  Atención al público: Lunes a Viernes, 9:00–15:00 h
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* Mapa */}
      <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Mapa de San Marcos, Guerrero
        </Typography>
        <Box
          sx={{
            position: "relative",
            pt: "56.25%",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <Box
            component="iframe"
            title="Mapa de San Marcos, Guerrero"
            src="https://www.google.com/maps?q=San%20Marcos,%20Guerrero&output=embed"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  );
};
