import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

class MenuPrincipal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <div className="container">
        <ul className="nav nav-tabs py-1 bg-dark" id="navId" role="tablist">
          <li className="nav-item">
            <a href="/" className="nav-link" data-bs-toggle="tab" aria-current="page">
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle as="button" className="nav-link">
                Cursos
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/ListarCurso">Listar Cursos</Dropdown.Item>
                <Dropdown.Item href="/CrearCurso">Crear Curso</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle as="button" className="nav-link">
                Estudiantes
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/ListarEstudiante">Listar Estudiantes</Dropdown.Item>
                <Dropdown.Item href="/CrearEstudiante">Crear Estudiante</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle as="button" className="nav-link">
                Grupos
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/ListarGrupo">Listar Grupos</Dropdown.Item>
                <Dropdown.Item href="/CrearGrupo">Crear Grupo</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
}

export default MenuPrincipal;

