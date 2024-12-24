import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "../hooks/useForm.jsx";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EJIDATARIO } from "../utils/const.js";
import Swal from "sweetalert2";

export const Ejidatarios = () => {
  const params = useParams();
  let location = useLocation();

  const [ejidatario, setEjidatario] = useState({});

  useEffect(() => {
    if (location.pathname.includes("editar")) {
      const fetchData = async () => {
        const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${params.ID}`;
        const response = await fetch(url);
        const data = await response.json();
        setEjidatario(data);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (ejidatario) {
      reset({
        calidadAgraria: ejidatario.calidadAgraria || "",
        iD_Ejidatario: ejidatario.iD_Ejidatario || "",
        nombre: ejidatario.nombre || "",
        apellidoPaterno: ejidatario.apellidoPaterno || "",
        apellidoMaterno: ejidatario.apellidoMaterno || "",
        telefono: ejidatario.telefono || "",
        curp: ejidatario.curp || "",
        documentoPDF: ejidatario.documentoPDF || "",
      });
    }
  }, [ejidatario]);

  const initialForm =
    params.ID !== undefined
      ? {
          calidadAgraria: ejidatario.calidadAgraria,
          iD_Ejidatario: ejidatario.iD_Ejidatario,
          nombre: ejidatario.nombre,
          apellidoPaterno: ejidatario.apellidoPaterno,
          apellidoMaterno: ejidatario.apellidoMaterno,
          telefono: ejidatario.telefono,
          curp: ejidatario.curp,
          documentoPDF: ejidatario.documentoPDF,
        }
      : {
          calidadAgraria: "",
          iD_Ejidatario: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          telefono: "",
          curp: "",
          documentoPDF: "",
        };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  console.log(ejidatario, formValues)
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      try {
        // const apiEjidaterios = "http://localhost:3000/api/ejidatarios";
        const apiEjidaterios =
          params.ID === undefined
            ? "https://ejidatarios-api.onrender.com/api/ejidatarios"
            : `https://ejidatarios-api.onrender.com/api/ejidatarios/${ejidatario._id}`;

        // Crear un objeto FormData
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await fetch(apiEjidaterios, {
          method: params.ID === undefined ? "POST" : "PUT",
          body: formData, // Enviar el FormData directamente
        });

        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        Swal.fire({
          icon: `${data.msg ? "success" : "error"}`,
          title: `${data.msg ? data.msg : "Error en el formulario"}`,
          showConfirmButton: false,
          timer: 1800,
        });
      } catch (error) {
        console.error("Error al enviar los datos:", error.message);
      }

      // Limpiar el formulario
      reset();
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="vh-100">
      <h2 className="text-center my-4 fs-1 text-info ">
        {params.ID === undefined
          ? "Agregar Sujeto Agrario"
          : "Editar Sujeto Agrario"}
      </h2>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="my-5"
          controlId="validationCustom01"
          hasValidation
        >
          <Col md={"6"} className="">
            <Form.Label>{EJIDATARIO.calidadAgraria}:</Form.Label>
            <Form.Group className="mb-3">
              <Form.Select
                value={formValues.calidadAgraria}
                onChange={handleInputChange}
                name="calidadAgraria"
                required
              >
                <option value={""}>Seleccione una opcion</option>
                <option value="EJIDATARIO">1.-EJIDATARIO</option>
                <option value="AVECINDADO">2.-AVECINDADO</option>
                <option value="POSESIONARIO DE HECHO">
                  3.-POSESIONARIO DE HECHO
                </option>
                <option value="POSESIONARIO DE DERECHO">
                  4.-POSESIONARIO DE DERECHO
                </option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Group>
        {
          //formValues.calidadAgraria !== "" &&
          <Form.Group
            as={Row}
            className="my-5"
            controlId="validationCustomUsername22"
            hasValidation
          >
            <Col>
              <Form.Label>{EJIDATARIO.id}:</Form.Label>
              <Form.Control
                autoComplete="off"
                required
                placeholder={EJIDATARIO.id}
                value={formValues.iD_Ejidatario}
                onChange={handleInputChange}
                name="iD_Ejidatario"
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>{EJIDATARIO.nombre}:</Form.Label>
              <Form.Control
                autoComplete="nope"
                required
                placeholder={EJIDATARIO.nombre}
                value={formValues.nombre}
                onChange={handleInputChange}
                name="nombre"
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        }
        {
          //formValues.nombre !== "" &&
          <Form.Group as={Row} className="my-5" hasValidation>
            <Col>
              <Form.Label>{EJIDATARIO.apellidoPaterno}:</Form.Label>
              <Form.Control
                required
                autoComplete="nope"
                placeholder={EJIDATARIO.apellidoPaterno}
                value={formValues.apellidoPaterno}
                onChange={handleInputChange}
                name="apellidoPaterno"
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>{EJIDATARIO.apellidoMaterno}:</Form.Label>
              <Form.Control
                required
                autoComplete="nope"
                placeholder={EJIDATARIO.apellidoMaterno}
                value={formValues.apellidoMaterno}
                onChange={handleInputChange}
                name={"apellidoMaterno"}
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        }
        {
          //   formValues.apellidoMaterno !== "" &&
          <Form.Group as={Row} className="my-5" hasValidation>
            <Col>
              <Form.Label>{EJIDATARIO.telefono}:</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                placeholder={EJIDATARIO.telefono}
                value={formValues.telefono}
                onChange={handleInputChange}
                name="telefono"
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>{EJIDATARIO.curp}:</Form.Label>
              <Form.Control
                required
                autoComplete="off"
                placeholder={EJIDATARIO.curp}
                value={formValues.curp}
                onChange={handleInputChange}
                name="curp"
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
              <Link to={`https://www.gob.mx/curp/`} target={"_blank"}>
                Obtener CURP
              </Link>
            </Col>
          </Form.Group>
        }
        {
          //formValues.telefono !== "" &&
          <Form.Group as={Row} className="my-5" hasValidation>
            <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>{EJIDATARIO.ine}:</Form.Label>
                <Form.Control
                  type="file"
                  autoComplete="off"
                  onChange={handleInputChange} // Sigue utilizando el mismo manejador
                  name="documentoPDF"
                />
              </Form.Group>
            </Col>
          </Form.Group>
        }
        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
};
