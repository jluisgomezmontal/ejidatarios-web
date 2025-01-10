import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm.jsx";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../redux/loginSlice.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const initialForm = {
    telefono: "",
    contraseña: "",
  };
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formValues, handleInputChange] = useForm(initialForm);
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    const url = "https://ejidatarios-api.onrender.com/api/usuarios";
    const response = await fetch(url);
    const data = await response.json();
    const usuario = data.find((user) => user.telefono === formValues.telefono);
    if (!usuario) setError(true);
    if (
      usuario.telefono === formValues.telefono &&
      usuario.password === formValues.contraseña
    ) {
      setError(false);
      dispatch(setLoggedIn(JSON.stringify(usuario)));
      navigate("/");
    } else {
      setError(true);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className=" p-5 border border-info border-3 rounded">
        <h1 className="mb-5">Iniciar Sesion</h1>
        <Col className="mx-">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Numero de Celular</Form.Label>
            <Form.Control
              type="email"
              autoComplete="false"
              placeholder="Introduce Celular"
              onChange={handleInputChange}
              name="telefono"
              value={formValues.telefono}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label visuallyHidden>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introduce Contraseña"
              onChange={handleInputChange}
              name="contraseña"
              value={formValues.contraseña}
            />
          </Form.Group>
        </Col>
        {error && <p className="bg-danger px-2 px-5">Datos incorrectos</p>}
        <div className="d-grid gap-2">
          <Button onClick={handleClick} variant="outline-success">
            Entrar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
