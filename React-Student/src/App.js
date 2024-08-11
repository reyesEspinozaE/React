//Curso
import ListarCurso from './componentsCurso/listarCurso';
import CrearCurso from './componentsCurso/crearCurso';
//Grupo
import ListarGrupo from './componentsGrupo/listarGrupo';
import CrearGrupo from './componentsGrupo/crearGrupo';
//Estudiante
import ListarEstudiante from './componentsEstudiante/listarEstudiante';
import CrearEstudiante from './componentsEstudiante/crearEstudiante';

import MenuPrincipal from './componentsPlantilla/Menu';
import Dashboard from './componentsPlantilla/Dashboard';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';


//imr
//ccc
//
function App() {
  return (
    <div className="App">
        <MenuPrincipal> </MenuPrincipal>
        <Router>
          <Route exact path="/" component={Dashboard} />
          {/* Rutas para Curso */}
          <Route path="/listarCurso" component={ListarCurso} />
          <Route path="/crearCurso" component={CrearCurso} />
          {/* //Rutas para Grupo */}
          <Route path="/listarGrupo" component={ListarGrupo} />
          <Route path="/crearGrupo" component={CrearGrupo} />
          {/* //Rutas para Estudiante */}
          <Route path="/listarEstudiante" component={ListarEstudiante} />
          <Route path="/crearEstudiante" component={CrearEstudiante} /> 
        </Router>
    </div>
  );
}

export default App;
