import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm.jsx";
import { useState } from "react";
import { Badge } from "react-bootstrap";
import { TERRENO } from "../utils/const.js";
import Swal from "sweetalert2";

const initialForm = {
  iD_Ejidatario: "",
  tipoCertificado: "", // Cambiado a un array
  numeroParcela: "",
  numeroCertificado: "",
  actoJuridico: "ADDAT",
  documentoPDF: "",
  parcelaOrigen: "",
};

export const Ejidos = () => {
  const [formValues, handleInputChange, reset, agregarPropietario] =
    useForm(initialForm);
  const [ejidatario, setEjidatario] = useState({});
  const [origen, setOrigen] = useState({});
  const [validated, setValidated] = useState(false);
  const [validated1, setValidated1] = useState(false);

  const handleIdentificar = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.iD_Ejidatario}`;
        const response = await fetch(url);
        const data = await response.json();
        setEjidatario(data);
        agregarPropietario(data._id, false);
      } catch (error) {
        console.error("Error al enviar los datos:", error.message);
      }
      // Limpiar el formulario
      setValidated1(false);
    } else {
      setValidated1(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      try {
        const url = `https://ejidatarios-api.onrender.com/api/terrenos`;
        //const url = `http://localhost:3000/api/terrenos/`;

        // Crear un objeto FormData
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await fetch(url, {
          method: "POST",
          body: formData, // Enviar el FormData directamente
        });

        const data = await response.json();
        Swal.fire({
          icon: `${data.msg ? "success" : "error"}`,
          title: `${data.msg ? data.msg : "Error en el formulario"}`,
          showConfirmButton: false,
          timer: 1800,
        });
        reset();
        setEjidatario({});
        setOrigen({});
      } catch (error) {
        console.error("Error al enviar los datos:", error.message);
      }
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleOrigen = async (e) => {
    try {
      e.preventDefault();
      const url = `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${formValues.parcelaOrigen}`;
      const response = await fetch(url);
      const data = await response.json();
      agregarPropietario(data.propietario._id, true);
      setOrigen(data);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  return (
    <div className="vh-100">
      <h2 className="text-center my-4 fs-1 text-info ">Agregar Parcela</h2>
      <Form onSubmit={handleIdentificar} noValidate validated={validated1}>
        <Form.Group
          as={Row}
          className="my-5"
          controlId="validationCustom01"
          hasValidation
        >
          <Col md={"4"}>
            <Form.Label>{TERRENO.idSujeto}:</Form.Label>
            <Form.Control
              required
              placeholder="ID Ejidatario"
              onChange={handleInputChange}
              name="iD_Ejidatario"
              value={formValues.iD_Ejidatario}
            />
            <Form.Control.Feedback type="invalid">
              Campo Obligatorio
            </Form.Control.Feedback>
          </Col>
          <Col md={"2"} className="mt-auto">
            <Button variant="primary" type="submit">
              Identificar Sujeto
            </Button>
          </Col>
          <Col md={"4"} className="mt-auto">
            {ejidatario?.nombre !== undefined ? (
              <Badge pill bg="success" className={"p-3 fs-7"}>
                Ejidatario: {ejidatario?.nombre} {ejidatario?.apellidoPaterno}{" "}
                {ejidatario?.apellidoMaterno}
              </Badge>
            ) : (
              ejidatario?.error === "Ejidatario no encontrado" && (
                <Badge pill bg="danger" className={"p-3 fs-7"}>
                  Ejidatario no encontrado
                </Badge>
              )
            )}
          </Col>
        </Form.Group>
      </Form>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group
          as={Row}
          className="my-5"
          controlId="validationCustom02"
          hasValidation
        >
          <Col md={"6"}>
            <Form.Label>{TERRENO.tipoCertificado}:</Form.Label>
            <Form.Select
              onChange={handleInputChange}
              name="tipoCertificado"
              required
              value={formValues.tipoCertificado}
            >
              <option value={""}>SELECCIONE UNA OPCION</option>
              <option value="PARCELARIO">1.-PARCELARIO</option>
              <option value="POSESION">2.-POSESION</option>
              <option value="USO COMUN">3.-USO COMUN</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Campo Obligatorio
            </Form.Control.Feedback>
          </Col>
          {formValues.tipoCertificado === "PARCELARIO" && (
            <Col md={"6"} controlId="validationCustom03" hasValidation>
              <Form.Label>{TERRENO.numeroParcela}:</Form.Label>
              <Form.Control
                placeholder={TERRENO.numeroParcela}
                onChange={handleInputChange}
                name="numeroParcela"
                value={formValues.numeroParcela}
                required
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
          )}
          <Form.Control.Feedback type="invalid">
            Campo Obligatorio
          </Form.Control.Feedback>
        </Form.Group>
        {formValues.tipoCertificado === "POSESION" && (
          <Form.Group
            as={Row}
            className="my-5"
            controlId="validationCustom04"
            hasValidation
          >
            <Col md={"4"}>
              <Form.Label>{TERRENO.parcelaOrigen}:</Form.Label>
              <Form.Control
                placeholder={TERRENO.parcelaOrigen}
                onChange={handleInputChange}
                name="parcelaOrigen"
                required
                value={formValues.parcelaOrigen}
              />
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Col>
            <Col md={"2"} className="mt-4">
              <Form.Label
                onClick={handleOrigen}
                className="btn btn-primary mt-2"
              >
                Identificar Parcela
              </Form.Label>
            </Col>
            <Col
              md={"4"}
              className="mt-4"
              controlId="validationCustom05"
              hasValidation
            >
              {origen?.propietario?.nombre !== undefined ? (
                <Badge pill bg="success" className={"p-3 fs-7"}>
                  Propietario: {origen?.propietario.nombre}{" "}
                  {origen?.propietario.apellidoPaterno}{" "}
                  {origen?.propietario.apellidoMaterno}
                </Badge>
              ) : (
                origen?.error === "Ejido no encontrado" && (
                  <Badge pill bg="danger" className={"p-3 fs-7"}>
                    Propietario no encontrado
                  </Badge>
                )
              )}
            </Col>
            <Form.Control.Feedback type="invalid">
              Campo Obligatorio
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Group as={Row} className="my-5">
          <Col>
            <Form.Group
              className="mb-3"
              controlId="validationCustom06"
              hasValidation
            >
              <Form.Label>{TERRENO.actoJuridico}:</Form.Label>
              <Form.Select
                onChange={handleInputChange}
                name="actoJuridico"
                value={formValues.actoJuridico}
              >
                <option value={""}>Seleccione una opcion</option>
                <option value="ADDAT">1.-ADDAT</option>
                <option value="ENAJENACION">2.-AJENACION</option>
                <option value="SENTENCIA">3.-SENTENCIA</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Campo Obligatorio
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={"6"} controlId="validationCustom07" hasValidation>
            <Form.Label>
              {formValues.tipoCertificado === "POSESION"
                ? "Folio"
                : formValues.tipoCertificado === "USO COMUN"
                ? "Certificado Compartido"
                : TERRENO.numeroCertificado}
              :
            </Form.Label>
            <Form.Control
              placeholder={
                formValues.tipoCertificado === "POSESION"
                  ? "Folio"
                  : formValues.tipoCertificado === "USO COMUN"
                  ? "Número De Certificado Compartido"
                  : TERRENO.numeroCertificado
              }
              onChange={handleInputChange}
              name="numeroCertificado"
              value={formValues.numeroCertificado}
              required
            />
            <Form.Control.Feedback type="invalid">
              Campo Obligatorio
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {formValues.tipoCertificado === "POSESION" && (
          <>
            <Form.Group as={Row} className="my-5">
              <Col>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Credencial del Comprador</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleInputChange}
                    name="documentoPDF"
                  />
                </Form.Group>
              </Col>
            </Form.Group>
          </>
        )}
        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
};
