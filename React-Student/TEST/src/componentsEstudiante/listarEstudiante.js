import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class ListarEstudiante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datosCargados: false,
      datosEstudiantes: [],
      modalOpen: false,
      id: "",
      cedula: "",
      nombre: "",
      correoelectronico: "",
      telefono: "",
      telefonocelular: "",
      fechanacimiento: "",
      sexo: "",
      direccion: "",
      apellidopaterno: "",
      apellidomaterno: "",
      nacionalidad: "",
      idCarreras: "",
      usuario: "",
      formValid: false,
      datosGrupos: [],
      getNombreGrupo: {},
    };
    
  }

  cargarDatos() {
    fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaEstudiantes.php")
      .then((response) => response.json())
      .then((datosrespuesta) => {
        this.setState({
          datosCargados: true,
          datosEstudiantes: datosrespuesta.data,
        });
        console.log(datosrespuesta.data);
      })
      .catch(console.log);
  }

  cargarDatosGrupos() {
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

  getNombreGrupo(idCarrera) {
    const getNombre = this.state.datosGrupos.find((option) => option.id === idCarrera);
    const nombreGrupo = getNombre ? getNombre.nombre : ""; // Manejar caso de no encontrar el grupo
  
    return nombreGrupo;
  }
  editar(objeto) {
    console.log(objeto);
    this.setState({
      id: objeto.id,
      cedula: objeto.cedula,
      nombre: objeto.nombre,
      correoelectronico: objeto.correoelectronico,
      telefono: objeto.telefono,
      telefonocelular: objeto.telefonocelular,
      fechanacimiento: objeto.fechanacimiento,
      sexo: objeto.sexo,
      direccion: objeto.direccion,
      apellidopaterno: objeto.apellidopaterno,
      apellidomaterno: objeto.apellidomaterno,
      nacionalidad: objeto.nacionalidad,
      idCarreras: objeto.idCarreras,
      usuario: objeto.usuario,
    });
    this.openModal();
  }

  cambioValor = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.validarFormulario);
  };

  validarFormulario = () => {
    const {
      cedula,
      nombre,
      correoelectronico,
      telefono,
      telefonocelular,
      fechanacimiento,
      sexo,
      direccion,
      apellidopaterno,
      apellidomaterno,
      nacionalidad,
      idCarreras,
      usuario,
    } = this.state;
    const formValid =
      cedula.trim() !== "" &&
      nombre.trim() !== "" &&
      correoelectronico.trim() !== "" &&
      telefono.trim() !== "" &&
      telefonocelular.trim() !== "" &&
      fechanacimiento.trim() !== "" &&
      sexo.trim() !== "" &&
      direccion.trim() !== "" &&
      apellidopaterno.trim() !== "" &&
      apellidomaterno.trim() !== "" &&
      nacionalidad.trim() !== "" &&
      idCarreras.trim() !== "" &&
      usuario.trim() !== "";
    this.setState({ formValid });
  };

  enviarDatos = (e) => {
    e.preventDefault();

    const {
      formValid,
      id,
      cedula,
      nombre,
      correoelectronico,
      telefono,
      telefonocelular,
      fechanacimiento,
      sexo,
      direccion,
      apellidopaterno,
      apellidomaterno,
      nacionalidad,
      idCarreras,
      usuario,
      grupo
    } = this.state;

    if (formValid) {
      var datosenviar = {
        id: id,
        cedula: cedula,
        nombre: nombre,
        correoelectronico: correoelectronico,
        telefono: telefono,
        telefonocelular: telefonocelular,
        fechanacimiento: fechanacimiento,
        sexo: sexo,
        direccion: direccion,
        apellidopaterno: apellidopaterno,
        apellidomaterno: apellidomaterno,
        nacionalidad: nacionalidad,
        idCarreras: grupo,
        usuario: usuario,
      };

      console.log(datosenviar);

      fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarEstudiantes.php", {
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
    fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarEstudiantes.php", {
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
    this.cargarDatosGrupos();
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  limpiarCampos = () => {
    this.setState({
      cedula: "",
      nombre: "",
      correoelectronico: "",
      telefono: "",
      telefonocelular: "",
      fechanacimiento: "",
      sexo: "",
      direccion: "",
      apellidopaterno: "",
      apellidomaterno: "",
      nacionalidad: "",
      idCarreras: "",
      usuario: "",
    });
  };

  render() {
    const {
      datosCargados,
      datosEstudiantes,
      modalOpen,
      id,
      cedula,
      nombre,
      correoelectronico,
      telefono,
      telefonocelular,
      fechanacimiento,
      sexo,
      direccion,
      apellidopaterno,
      apellidomaterno,
      nacionalidad,
      idCarreras,
      usuario,
      formValid,
      datosGrupos,
      grupo,
      
    } = this.state;
    return (
      <div className="container">
        <h1>Listar Estudiantes</h1>
        <div className="table-responsive">
          <table className="table table-warning">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Cédula</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo Electrónico</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Teléfono Celular</th>
                <th scope="col">Fecha de Nacimiento</th>
                <th scope="col">Sexo</th>
                <th scope="col">Apellido Paterno</th>
                <th scope="col">Apellido Materno</th>
                <th scope="col">Nacionalidad</th>
                <th scope="col">Usuario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosEstudiantes.map((datosExtraidos) => (
                <tr key={datosExtraidos.id} className="table-dark">
                  <td scope="row">{datosExtraidos.id}</td>
                  <td>{datosExtraidos.cedula}</td>
                  <td>{datosExtraidos.nombre}</td>
                  <td>{datosExtraidos.correoelectronico}</td>
                  <td>{datosExtraidos.telefono}</td>
                  <td>{datosExtraidos.telefonocelular}</td>
                  <td>{datosExtraidos.fechanacimiento}</td>
                  <td>{datosExtraidos.sexo}</td>
                  <td>{datosExtraidos.apellidopaterno}</td>
                  <td>{datosExtraidos.apellidomaterno}</td>
                  <td>{datosExtraidos.nacionalidad}</td>
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
                    |
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
            <Modal.Title>Editar Estudiante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="formulario" onSubmit={this.enviarDatos}>
              <div class="container">


                <div className="row">
                  <div className="col">
                    <div className="mb-3">
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
                        placeholder="Ingrese su nombre"
                        onChange={this.cambioValor}
                        value={nombre}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese el nombre del estudiante
                      </small>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="apellidopaterno" className="form-label">
                        Apellido Paterno
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="apellidopaterno"
                        id="apellidopaterno"
                        aria-describedby="helpId"
                        placeholder="Ingrese su apellido paterno"
                        onChange={this.cambioValor}
                        value={apellidopaterno}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese el apellido paterno del estudiante
                      </small>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="apellidomaterno" className="form-label">
                        Apellido Materno
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="apellidomaterno"
                        id="apellidomaterno"
                        aria-describedby="helpId"
                        placeholder="Ingrese su apellido materno"
                        onChange={this.cambioValor}
                        value={apellidomaterno}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese el apellido materno del estudiante
                      </small>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="cedula" className="form-label">
                        Cédula
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="cedula"
                        id="cedula"
                        aria-describedby="helpId"
                        placeholder="Ingrese la cédula"
                        onChange={this.cambioValor}
                        value={cedula}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese la cédula del estudiante
                      </small>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div className="mb-3">
                      <label htmlFor="correo" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        name="correo"
                        id="correo"
                        aria-describedby="helpId"
                        placeholder="Ingrese el correo electrónico"
                        onChange={this.cambioValor}
                        value={correoelectronico}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese el correo electrónico del estudiante
                      </small>
                    </div>
                  </div>

                  <div class="col">
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          name="telefono"
                          id="telefono"
                          aria-describedby="helpId"
                          placeholder="Ingrese el teléfono"
                          onChange={this.cambioValor}
                          value={telefono}
                        />
                        <small id="helpId" className="form-text text-muted">
                          Ingrese el teléfono del estudiante
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="telefonocelular" className="form-label">
                        Teléfono Celular
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="telefonocelular"
                        id="telefonocelular"
                        aria-describedby="helpId"
                        placeholder="Teléfono Celular del estudiante"
                        onChange={this.cambioValor}
                        value={telefonocelular}
                        required
                      ></input>
                      <small id="helpId" className="form-text text-muted">
                        Ingresa el teléfono celular del estudiante
                      </small>
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="fechanacimiento" className="form-label">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechanacimiento"
                        id="fechanacimiento"
                        aria-describedby="helpId"
                        placeholder="Fecha de Nacimiento del estudiante"
                        onChange={this.cambioValor}
                        value={fechanacimiento}
                        required
                      ></input>
                      <small id="helpId" className="form-text text-muted">
                        Ingresa la fecha de nacimiento del estudiante
                      </small>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="sexo" className="form-label">
                        Sexo
                      </label>
                      <select
                        className="form-control"
                        name="sexo"
                        id="sexo"
                        aria-describedby="helpId"
                        onChange={this.cambioValor}
                        value={sexo}
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Indefinido">Indefinido</option>
                      </select>
                      <small id="helpId" className="form-text text-muted">
                        Ingrese el sexo del estudiante
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="direccion" className="form-label">
                        Dirección
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="direccion"
                        id="direccion"
                        aria-describedby="helpId"
                        placeholder="Ingrese la dirección"
                        onChange={this.cambioValor}
                        value={direccion}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese la dirección del estudiante
                      </small>
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="nacionalidad" className="form-label">
                        Nacionalidad
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="nacionalidad"
                        id="nacionalidad"
                        aria-describedby="helpId"
                        placeholder="Ingrese la nacionalidad"
                        onChange={this.cambioValor}
                        value={nacionalidad}
                      />
                      <small id="helpId" className="form-text text-muted">
                        Ingrese la nacionalidad del estudiante
                      </small>
                    </div>
                  </div>


                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="grupo" className="form-label">
                        Grupo
                      </label>

                      {/* <input
                        type="text"
                        className="form-control"
                        name="idCarreras"
                        id="idCarreras"
                        aria-describedby="helpId"
                        placeholder="Id Carreras del estudiante"
                        onChange={this.cambioValor}
                        value={idCarreras}
                      ></input> */}
                      <select
                        className="form-control"
                        name="grupo"
                        id="grupo"
                        aria-describedby="helpId"
                        onChange={this.cambioValor}
                        value={grupo}
                        required
                      >
                        
                        <option value="">{this.getNombreGrupo(idCarreras)}</option>
                        {datosGrupos.map((option) => (
                          <option key={option.id} value={option.id}>{option.nombre}</option>
                        ))}
                      </select>
                      <small id="helpId" className="form-text text-muted">
                        Seleccione el grupo del studiante
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="formulario"
              disabled={!formValid}
            >
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ListarEstudiante;