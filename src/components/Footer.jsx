import { Box, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white",
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: "center",
        mt: 5,
        py: 6,
        fontSize: "0.9rem",
        zIndex:9999
      }}
    >
      Aplicación de Ejido del San Marcos ©{new Date().getFullYear()} - Todos los
      derechos reservados.
    </Box>
  );
};
