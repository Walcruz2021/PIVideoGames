// 1:04:00 2 repaso

import './App.css';
import LandingPage from "./componentes/LandingPage"
import Home from "./componentes/Home"
import VideoGameCreate from "./componentes/VideoGameCreate"
import Details from "./componentes/Details"
import {BrowserRouter,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* Switch en caso de que se ponga una direccion equivocada a proposito tomara el ultimo 
      que se ingreso correctamente */}
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/home" component={Home}/>
      <Route path="/videogames" component={VideoGameCreate}/>
      <Route path="/details/:id" component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
