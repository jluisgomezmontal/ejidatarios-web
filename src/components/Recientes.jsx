import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";

const MAX_RECIENTES = 10;

export const Recientes = () => {
  const { recientes } = useSelector((state) => state.login);

  if (!recientes || recientes.length === 0) {
    return null;
  }

  const recientesLimitados = recientes.slice(0, MAX_RECIENTES);

  return (
    <Card elevation={2} sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <HistoryIcon color="primary" />
          <Typography variant="h6" color="primary" fontWeight="bold">
            Búsquedas Recientes
          </Typography>
        </Box>

        {recientesLimitados.length > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Últimas {recientesLimitados.length} búsquedas
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {recientesLimitados.map((r, index) => (
            <Button
              key={`${r.ejidatario}-${index}`}
              component={RouterLink}
              to={`/perfil/${r.ejidatario}`}
              variant="outlined"
              size="small"
              startIcon={<PersonIcon />}
              sx={{
                justifyContent: "flex-start",
                textAlign: "left",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {r.nombre}
              </Typography>
            </Button>
          ))}
        </Box>

        {recientes.length > MAX_RECIENTES && (
          <Chip
            label={`+${recientes.length - MAX_RECIENTES} más`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
};
