import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ListarCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      datosCursos: [],
      modalOpen: false,
      nombre: "",
      descripcion: "",
      tiempo: "",
      usuario: "",
      id: "",
      formValid: false,
    };
  }

  cargarDatos() {
    fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php")
      .then((response) => response.json())
      .then((datosrespuesta) => {
        this.setState({
          datosCargados: true,
          datosCursos: datosrespuesta.data,
        });
        console.log(datosrespuesta.data);
      })
      .catch(console.log);
  }

  editar(objeto) {
    console.log(objeto);
    this.setState({
      id: objeto.id,
      nombre: objeto.nombre,
      descripcion: objeto.descripcion,
      tiempo: objeto.tiempo,
      usuario: objeto.usuario,
    });
    this.openModal();
  }

  cambioValor = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validarFormulario);
  };

  validarFormulario = () => {
    const { nombre, descripcion, tiempo, usuario } = this.state;
    const formValid =
      nombre.trim() !== "" &&
      descripcion.trim() !== "" &&
      tiempo.trim() !== "" &&
      usuario.trim() !== "";
    this.setState({ formValid });
  };

  enviarDatos = (e) => {
    e.preventDefault();

    const { formValid, id, nombre, descripcion, tiempo, usuario } = this.state;

    if (formValid) {
      var datosenviar = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        tiempo: tiempo,
        usuario: usuario,
      };

      console.log(datosenviar);

      fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarCursos.php", {
        method: "POST",
        body: JSON.stringify(datosenviar),
      })
        .then((respuesta) => respuesta.json())
        .then((datosrepuesta) => {
          this.cargarDatos();
          this.closeModal();
        })
        .catch(console.log);
    }
  };

  eliminar(id) {
    var datosEnviar = {
      id: id,
    };
    fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarCursos.php", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((response) => response.json())
      .then((datosrespuesta) => {
        this.cargarDatos();
      });
  }

  componentDidMount() {
    this.cargarDatos();
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  limpiarCampos = () => {
    this.setState({
      nombre: "",
      usuario: "",
      descripcion: "",
      tiempo: "",
    });
  };

  render() {
    const {
      datosCargados,
      datosCursos,
      modalOpen,
      nombre,
      descripcion,
      tiempo,
      id,
      usuario,
      formValid,
    } = this.state;
    return (
      <div className="container">
        <h1>Listar Cursos</h1>
        <div className="table-responsive">
          <table className="table table-warning">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Usuario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosCursos.map((datosExtraidos) => (
                <tr key={datosExtraidos.id} className="table-dark">
                  <td scope="row">{datosExtraidos.id}</td>
                  <td>{datosExtraidos.nombre}</td>
                  <td>{datosExtraidos.descripcion}</td>
                  <td>{datosExtraidos.tiempo}</td>
                  <td>{datosExtraidos.usuario}</td>

                  <td>
                    <a
                      name=""
                      id=""
                      className="btn btn-danger"
                      onClick={() => this.eliminar(datosExtraidos.id)}
                      role="button"
                    >
                      Borrar
                    </a>
                    ||
                    <a
                      name=""
                      id=""
                      className="btn btn-primary"
                      onClick={() => this.editar(datosExtraidos)}
                      role="button"
                    >
                      Editar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal show={modalOpen}>
          <Modal.Header>
            <Modal.Title>Editar Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="formulario" onSubmit={this.enviarDatos}>
              <div className="mb-3">
                <input
                  type="hidden"
                  id="id"
                  name="id"
                  onChange={this.cambioValor}
                  value={id}
                  required
                ></input>
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  aria-describedby="helpId"
                  placeholder="Nombre del curso"
                  onChange={this.cambioValor}
                  value={nombre}
                  required
                ></input>
                <small id="helpId" className="form-text text-muted">
                  Ingresa el nombre del curso
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripcion
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                  aria-describedby="helpId"
                  placeholder="Descripcion del curso"
                  onChange={this.cambioValor}
                  value={descripcion}
                ></input>
                <small id="helpId" className="form-text text-muted">
                  Ingresa la Descripcion del curso
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="tiempo" className="form-label">
                  Tiempo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="tiempo"
                  id="tiempo"
                  aria-describedby="helpId"
                  placeholder="Tiempo del curso"
                  onChange={this.cambioValor}
                  value={tiempo}
                  required
                ></input>
                <small id="helpId" className="form-text text-muted">
                  Ingresa el Tiempo del curso
                </small>
              </div>
              <div className="mb-3" hidden>
                <label htmlFor="usuario" className="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="usuario"
                  id="usuario"
                  aria-describedby="helpId"
                  placeholder="Usuario"
                  onChange={this.cambioValor}
                  value={usuario}
                  required
                ></input>
                <small id="helpId" className="form-text text-muted">
                  Ingresa el usuario
                </small>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.closeModal()}
                >
                  Close
                </button>
                ||
                <button type="reset" className="btn btn-danger" onClick={this.limpiarCampos}>
                  Reset
                </button>
                ||
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formValid}
                >
                  Actualizar
                </button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ListarCurso;
