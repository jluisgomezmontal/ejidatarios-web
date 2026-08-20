import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { API_URL } from "../utils/const.js";

const CARPETAS = [
  { label: "Ejidatarios", value: "ejidatarios" },
  { label: "Terrenos", value: "terrenos" },
];

const LIMITE_RESULTADOS = 200;

export const Documentos = () => {
  const [tab, setTab] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [archivosPorCarpeta, setArchivosPorCarpeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carpeta = CARPETAS[tab].value;

  useEffect(() => {
    if (archivosPorCarpeta[carpeta]) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/api/documentos/${carpeta}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de documentos");
        return res.json();
      })
      .then((data) => {
        setArchivosPorCarpeta((prev) => ({ ...prev, [carpeta]: data }));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [carpeta, archivosPorCarpeta]);

  const archivos = archivosPorCarpeta[carpeta] || [];

  const filtrados = useMemo(() => {
    if (!busqueda) return archivos.slice(0, LIMITE_RESULTADOS);
    const q = busqueda.toLowerCase();
    return archivos
      .filter((a) => a.toLowerCase().includes(q))
      .slice(0, LIMITE_RESULTADOS);
  }, [archivos, busqueda]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Documentos
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, v) => {
          setTab(v);
          setBusqueda("");
        }}
        sx={{ mb: 2 }}
      >
        {CARPETAS.map((c) => (
          <Tab key={c.value} label={c.label} />
        ))}
      </Tabs>
      <TextField
        fullWidth
        placeholder="Buscar por nombre de archivo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {archivos.length} documentos en total
            {filtrados.length === LIMITE_RESULTADOS &&
              ` — mostrando los primeros ${LIMITE_RESULTADOS}, refina tu búsqueda`}
          </Typography>
          <List>
            {filtrados.map((archivo) => (
              <ListItem key={archivo} disablePadding divider>
                <ListItemButton
                  component="a"
                  href={`${API_URL}/uploads/${carpeta}/${archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemText primary={archivo} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};
