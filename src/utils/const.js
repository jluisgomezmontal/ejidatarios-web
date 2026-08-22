export const LOCAL_API_URL = "http://localhost:3000";
export const PROD_API_URL = "https://ejidatarios-api.onrender.com";
const DEFAULT_API_URL = import.meta.env.VITE_API_URL || PROD_API_URL;

const apiOverride =
  typeof window !== "undefined"
    ? window.localStorage.getItem("apiTarget")
    : null;

export const API_URL =
  apiOverride === "local"
    ? LOCAL_API_URL
    : apiOverride === "render"
    ? PROD_API_URL
    : DEFAULT_API_URL;

export const EJIDATARIO = {
  calidadAgraria: "Calidad Agraria",
  id: "ID Ejidatario",
  nombre: "Nombre",
  nombreCompleto: "Nombre Completo",
  apellidoPaterno: "Apellido Paterno",
  apellidoMaterno: "Apellido Materno",
  telefono: "Teléfono",
  curp: "Curp",
  ine: "INE",
  perfil: "Perfil",
};

export const TERRENO = {
  numeroParcela: "Número de Parcela",
  tipoCertificado: "Tipo de Certificado",
  actoJuridico: "Acto Jurídico",
  numeroCertificado: "Número de Certificado",
  parcelaOrigen: "Parcela de Origen",
  documentoPDF: "Documentos",
  idSujeto: "ID Sujeto",
  propietario: "Propietario",
  posesionario: "Posesionario",
  folio: "Folio",
  emitido: "Emitido por",
  porcentaje: "Porcentaje",
};

export const RUTAS = {
  home: "/",
  agregarSujeto: "/agregar-sujeto",
  agregarParcela: "/agregar-parcela",
  buscar: "/buscar",
  perfil: "/perfil/",
  login: "login",
  admin: "/admin",
  perfilID: "perfil/:ID",
  parcela: "/parcela/",
  parcelaID: "parcela/:ID",
  terreno: "/terreno/",
  terrenoID: "terreno/:ID",
  editarEjidatarios: "editar/ejidatario/:ID",
  editarTerrenos: "editar/terreno/:ID",
};

export const BOTONES = {
  descargarINE: "Descargar INE",
  verINE: "Ver INE",
  editar: "Editar",
  editarEjidatario: "Confirmar",
  eliminar: "Eliminar",
  cancelarEdicion: "Cancelar",
  cancelar: "Datos no guardados",
};
