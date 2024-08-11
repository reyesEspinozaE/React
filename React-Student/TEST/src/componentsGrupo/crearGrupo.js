import React from "react";

class CrearCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      datosCargados: false,
    };
  }

  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre } = this.state;

    var datosEnviar = {
      nombre: nombre,
    };

    fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarGrupo.php", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    }) //url de peticion de datos
      .then((respuesta) => respuesta.json()) //recibe los datos en formato json
      .then((datosrepuesta) => {
        console.log("Datos", datosrepuesta);
        window.location = "ListarGrupo";
      })
      .catch(console.log); //muestra errores en la consola
  };

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    // this.setState({ state, datosCargados: true });
    this.setState({ state });
  };

  render() {
    const { nombre, datosCargados } = this.state;
    return (
      <div className="container">
        <h1>Crear Grupo</h1>
        <div className="form-control">
          <form id="formulario" onSubmit={this.enviarDatos}>
            <div className="row">
              <div className="col">
                <div className=" mb-3">
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
                    Ingrese el nombre del grupo
                  </small>
                </div>
              </div>
              </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button type="reset" className="btn btn-danger mx-1">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CrearCurso;
