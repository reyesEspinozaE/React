import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ListarGrupo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      datosGrupos: [],
      modalOpen: false,
      id: "",
      nombre: "",
      formValid: false
    };
  }

  cargarDatos() {
    fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaGrupo.php")
      .then((response) => response.json())
      .then((datosrespuesta) => {
        this.setState({
          datosCargados: true,
          datosGrupos: datosrespuesta.data,
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
    });
    this.openModal();
  }

  cambioValor = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validarFormulario();
    });
  };

  enviarDatos = (e) => {
    e.preventDefault();

    const { id, nombre } = this.state;

    var datosenviar = {
      id: id,
      nombre: nombre,
    };

    console.log(datosenviar);

    fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarGrupo.php", {
      method: "POST",
      body: JSON.stringify(datosenviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosrepuesta) => {
        this.cargarDatos();
        this.closeModal();
      })
      .catch(console.log);
  };

  eliminar(id) {
    var datosEnviar = {
      id: id,
    };
    fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarGrupo.php", {
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
      nombre: ""
    });
  };

  validarFormulario() {
    const { nombre } = this.state;
    const formValid = nombre.trim() !== "";
    this.setState({ formValid });
  }

  render() {
    const {
      datosCargados,
      datosGrupos,
      modalOpen,
      nombre,
      id,
      formValid
    } = this.state;
    return (
      <div className="container">
        <h1>Listar Grupos</h1>
        <div className="table-responsive">
          <table className="table table-warning">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosGrupos.map((datosExtraidos) => (
                <tr key={datosExtraidos.id} className="table-dark">
                  <td scope="row">{datosExtraidos.id}</td>
                  <td>{datosExtraidos.nombre}</td>
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
            <Modal.Title>Editar Grupo</Modal.Title>
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
                />
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  aria-describedby="helpId"
                  placeholder="Nombre del grupo"
                  onChange={this.cambioValor}
                  value={nombre}
                />
                <small id="helpId" className="form-text text-muted">
                  Ingresa el nombre del grupo
                </small>
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.closeModal()}
                >
                  Cerrar
                </button>
                ||
                <button
                  type="reset"
                  className="btn btn-danger"
                  onClick={this.limpiarCampos}
                >
                  Limpiar
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

export default ListarGrupo;
