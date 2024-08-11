import React from "react";

class CrearEstudiante extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      cedula: "",
      correo: "",
      telefono: "",
      telefonoCelular: "",
      fechaNacimiento: "",
      sexo: "",
      direccion: "",
      nombre: "",
      apellidopaterno: "",
      apellidomaterno: "",
      nacionalidad: "",
      idCarrera: "",
      datosCargados: false,
      datosGrupos: [],

    };
  }

  enviarDatos = (e) => {
    e.preventDefault();
    const {
      cedula,
      correo,
      telefono,
      telefonoCelular,
      fechaNacimiento,
      sexo,
      direccion,
      nombre,
      apellidopaterno,
      apellidomaterno,
      nacionalidad,
      idCarrera,
      grupo,
    } = this.state;

    var datosEnviar = {
      cedula: cedula,
      correoelectronico: correo,
      telefono: telefono,
      telefonocelular: telefonoCelular,
      fechanacimiento: fechaNacimiento,
      sexo: sexo,
      direccion: direccion,
      nombre: nombre,
      apellidopaterno: apellidopaterno,
      apellidomaterno: apellidomaterno,
      nacionalidad: nacionalidad,
      idCarreras: grupo,
      usuario: "BRENJUAN",
    };

    fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarEstudiantes.php", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosrepuesta) => {
        console.log("Datos", datosrepuesta);
        window.location = "ListarEstudiante";
      })
      .catch(console.log);
  };

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

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

  componentDidMount() {
    this.cargarDatosGrupos();
  }

  render() {
    const {
      cedula,
      correo,
      telefono,
      telefonoCelular,
      fechaNacimiento,
      sexo,
      direccion,
      nombre,
      apellidopaterno,
      apellidomaterno,
      nacionalidad,
      idCarrera,
      datosCargados,
      datosGrupos,
      grupo,
    } = this.state;
    return (
      <div className="container">
        <h1>Crear Estudiante</h1>
        <div className="form-control">
          <form id="formulario" onSubmit={this.enviarDatos}>
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

            <div className="row">
              <div className="col">
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
                    value={correo}
                  />
                  <small id="helpId" className="form-text text-muted">
                    Ingrese el correo electrónico del estudiante
                  </small>
                </div>
              </div>

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

            <div className="row">
              <div className="col">

                <div className="mb-3">
                  <label htmlFor="telefonoCelular" className="form-label">
                    Teléfono Celular
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    name="telefonoCelular"
                    id="telefonoCelular"
                    aria-describedby="helpId"
                    placeholder="Ingrese el teléfono celular"
                    onChange={this.cambioValor}
                    value={telefonoCelular}
                  />
                  <small id="helpId" className="form-text text-muted">
                    Ingrese el teléfono celular del estudiante
                  </small>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    name="fechaNacimiento"
                    id="fechaNacimiento"
                    aria-describedby="helpId"
                    placeholder="Ingrese la fecha de nacimiento"
                    onChange={this.cambioValor}
                    value={fechaNacimiento}
                  />
                  <small id="helpId" className="form-text text-muted">
                    Ingrese la fecha de nacimiento del estudiante
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
                  <select
                    className="form-control"
                    name="grupo"
                    id="grupo"
                    aria-describedby="helpId"
                    onChange={this.cambioValor}
                    value={grupo}
                    required
                  >
                    <option value="">Seleccionar un grupo</option>
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

            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CrearEstudiante;
