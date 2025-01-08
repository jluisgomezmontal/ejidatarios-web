import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { setLoggedOut } from "../redux/loginSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RUTAS } from "../utils/const.js";

function NavbarComponent() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  // Tiempo de inactividad en milisegundos (10 minutos)
  const inactivityTime = 10 * 1000 * 60;

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(setLoggedOut());
      }, inactivityTime);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark border-bottom border-info"
        variant="dark"
      >
        <Container>
          <Link className="text-decoration-none" to="/">
            <Navbar.Brand>Ejido de San Marcos</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link eventKey="3" disabled className="me-5">
                {user.nombre} {user.apellido}
              </Nav.Link>
              <Link
                className="text-decoration-none me-3 nav-link"
                to={RUTAS.agregarSujeto}
              >
                Sujetos
              </Link>
              <Link
                className="text-decoration-none me-3 nav-link"
                to={RUTAS.agregarParcela}
              >
                Parcela
              </Link>
              <Link
                className="text-decoration-none me-5 nav-link"
                to={RUTAS.buscar}
              >
                Buscar
              </Link>
              <Button
                variant="outline-danger"
                className="px-4"
                onClick={() => dispatch(setLoggedOut())}
              >
                Salir
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container id="detail" className="pt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default NavbarComponent;
