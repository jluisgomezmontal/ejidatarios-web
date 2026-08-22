import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useForm } from "../hooks/useForm.jsx";
import { useState } from "react";
import { EjidatarioTable } from "../components/EjidatarioTable.jsx";
import { useSelector } from "react-redux";
import { Recientes } from "../components/Recientes.jsx";
import { API_URL } from "../utils/const.js";

const API_BASE_URL = `${API_URL}/api`;

const SEARCH_METHODS = {
  NOMBRE: { label: "Nombre o Apellido", endpoint: (valor) => `${API_BASE_URL}/ejidatarios/search?q=${valor}` },
  ID: { label: "ID", endpoint: (valor) => `${API_BASE_URL}/ejidatarios/id/${valor}` },
  CURP: { label: "CURP", endpoint: (valor) => `${API_BASE_URL}/ejidatarios/curp/${valor}` },
  CALIDAD_AGRARIA: { label: "Calidad Agraria", endpoint: (valor) => `${API_BASE_URL}/ejidatarios/calidad/${valor}` },
  TELEFONO: { label: "Teléfono", endpoint: (valor) => `${API_BASE_URL}/ejidatarios/telefono/${valor}` },
  NUMEROPARCELA: { label: "Número de Parcela", endpoint: (valor) => `${API_BASE_URL}/terrenos/parcela/${valor}` },
  NUMEROCERTIFICADO: { label: "Número de Certificado", endpoint: (valor) => `${API_BASE_URL}/terrenos/certificado/${valor}` },
  PARCELAORIGEN: { label: "Parcela de Origen", endpoint: (valor) => `${API_BASE_URL}/terrenos/origen/${valor}` },
};

export const Buscar = () => {
  const initialForm = {
    metodoDeBusqueda: "NOMBRE",
    valor: "",
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { recientes } = useSelector((state) => state.login);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que haya un valor de búsqueda
    if (!formValues.valor.trim()) {
      setError("Por favor ingresa un valor de búsqueda");
      return;
    }

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const searchMethod = SEARCH_METHODS[formValues.metodoDeBusqueda];
      const url = searchMethod.endpoint(formValues.valor.trim());
      
      const response = await fetch(url);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // El backend regresa 404 + {error: "..."} cuando simplemente no hay
        // coincidencias — eso no es una falla real, es "sin resultados".
        if (response.status === 404 || data?.error) {
          setError("No se encontraron resultados para tu búsqueda");
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        setResultado(null);
        return;
      }

      if (data?.error || data === null || (Array.isArray(data) && data.length === 0)) {
        setError("No se encontraron resultados para tu búsqueda");
        setResultado(null);
      } else {
        setResultado(data);
      }
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      setError("Ocurrió un error al realizar la búsqueda. Por favor intenta de nuevo.");
      setResultado(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "2rem" }}>
      <Typography
        variant="h3"
        color="primary"
        textAlign="center"
        sx={{ mb: 4 }}
        fontWeight="bold"
      >
        Buscar en el Ejido
      </Typography>
      <Grid container spacing={3}>
        {recientes?.length > 0 && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Recientes />
          </Grid>
        )}
        <Grid size={{ xs: 12, md: recientes?.length > 0 ? 9 : 12 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel id="search-method-label">
                      Método de búsqueda
                    </InputLabel>
                    <Select
                      labelId="search-method-label"
                      id="search-method"
                      label="Método de búsqueda"
                      value={formValues.metodoDeBusqueda}
                      onChange={handleInputChange}
                      name="metodoDeBusqueda"
                      disabled={loading}
                    >
                      {Object.entries(SEARCH_METHODS).map(([key, { label }]) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    placeholder="Ingresa el valor a buscar"
                    value={formValues.valor}
                    onChange={handleInputChange}
                    name="valor"
                    label="Valor de búsqueda"
                    variant="outlined"
                    disabled={loading}
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    type="submit"
                    disabled={loading || !formValues.valor.trim()}
                    fullWidth
                  >
                    {loading ? "Buscando..." : "Buscar"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        {(resultado || error || loading) && (
          <Grid size={12}>
            <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
              Resultados
            </Typography>

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {error && !loading && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {resultado && !loading && !error && (
              <EjidatarioTable resultado={resultado} />
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
