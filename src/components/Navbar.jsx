import { Outlet, Link  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {setLoggedOut} from "../redux/loginSlice.js";
import {useDispatch} from "react-redux";

function NavbarComponent() {
    const dispatch = useDispatch()

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-dark border-bottom border-info" variant="dark">
                <Container>
                    <Link className={"text-decoration-none"} to={`/`}>
                        <Navbar.Brand>Ejido de San Marcos</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Link className={"text-decoration-none me-3"} to={`sujeto`}>
                                <Nav.Link href="#deets">Sujetos</Nav.Link>
                            </Link>
                            <Link className={"text-decoration-none me-3"} to={`parcela`}>
                                <Nav.Link href="#deets">Parcela</Nav.Link>
                            </Link>
                            <Link className={"text-decoration-none me-5 p-0"} to={`buscar`}>
                                <Nav.Link href="#deets">Buscar</Nav.Link>
                            </Link>
                            <Button variant="outline-danger" className="px-4" onClick={()=> dispatch(setLoggedOut())}>Salir</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container id="detail" className="pt-3">
                <Outlet/>
            </Container>
        </>
    );
}

export default NavbarComponent;