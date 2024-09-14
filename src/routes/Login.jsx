import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import {Usuarios} from "../mocks.js";
import {useForm} from "../hooks/useForm.jsx";
import { useDispatch } from 'react-redux'
import {setLoggedIn} from "../redux/loginSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Login() {
    const initialForm = {
        telefono: '7444215691', // Cambiado a un array
        contraseña: 'IBQ13320058',
    };
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [formValues, handleInputChange] = useForm(initialForm);
    const dispatch = useDispatch()
    const handleClick = (e)=>{
        e.preventDefault();
        const usuario = Usuarios.find(user => user.telefono === formValues.telefono);
        if (usuario?.telefono === formValues.telefono && usuario?.contraseña === formValues.contraseña){
            setError(false)
            dispatch(setLoggedIn(usuario))
            navigate("/");
        }else{
            setError(true)
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Form>
                <Col className="mx-">
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Numero de Celular</Form.Label>
                        <Form.Control type="email" placeholder="Introduce Celular" onChange={handleInputChange} name="telefono"
                                      value={formValues.telefono}/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Introduce Contraseña" onChange={handleInputChange} name="contraseña"
                                      value={formValues.contraseña}/>
                    </Form.Group>
                </Col>
                {
                    error && <p className="bg-danger px-2 px-5">Datos incorrectos</p>
                }
                <div className="d-grid gap-2">
                <Button onClick={handleClick} variant="outline-success">Entrar</Button>
                </div>
            </Form>
        </div>
    );
}

export default Login;
