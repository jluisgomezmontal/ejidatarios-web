import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";

export const Recientes = () => {
  const { recientes } = useSelector((state) => state.login);

  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            mb: 3,
          },
        }}
      ><Typography
        variant="overline"
        color="primary"
        textAlign="center"
        sx={{ display: "block", width: "100%", paddingBottom: ".5rem" }}
      >
        Busquedas recientes
      </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {recientes?.map((r) => (
            <Button
              key={r.ejidatario}
              component={RouterLink} // 👈 usa el Link de react-router-dom
              to={`/perfil/${r.ejidatario}`} // 👈 ruta
              color="secondary"
              size="small"
              sx={{ width: "50%", justifyContent: "flex-start" }}
            >
              {r.nombre}
            </Button>
          ))}
        </Box>
      </Box>
  )
}
