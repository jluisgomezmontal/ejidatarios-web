import { Box, useTheme, Typography } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#1e1e1e" : theme.palette.primary.main,
        color: isDark ? theme.palette.text.secondary : "white",
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: "center",
        mt: 5,
        py: 4,
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="body2" sx={{ opacity: isDark ? 0.7 : 1 }}>
        Aplicación de Ejido del San Marcos ©{new Date().getFullYear()} - Todos los
        derechos reservados.
      </Typography>
    </Box>
  );
};
