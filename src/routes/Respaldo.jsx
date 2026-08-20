import { Button, Stack } from "@mui/material";
import { API_URL } from "../utils/const.js";

export const Respaldo = () => {
  const endpoints = [
    {
      url: `${API_URL}/api/ejidatarios/export/users`,
      filename: "usuarios.json",
    },
    {
      url: `${API_URL}/api/ejidatarios/export/ejidatarios`,
      filename: "ejidatarios.json",
    },
    {
      url: `${API_URL}/api/ejidatarios/export/terrenos`,
      filename: "terrenos.json",
    },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleRespaldar = async () => {
    for (const { url, filename } of endpoints) {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Espera 1 segundo entre descargas
      await delay(1000);
    }
  };

  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <Button variant="contained" color="primary" onClick={handleRespaldar}>
        Respaldar
      </Button>
    </Stack>
  );
};
