import { useState, useEffect, useRef, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";

import { Context } from "./provider/provider"

import Header from "./reuseable-components/header/header.component";
import Test from "./pages/test/test";
import Homepage from "./pages/homepage/homepage";
import LoginPage from "./pages/login-page/login-page";
import Baustelle from "./pages/Baustelle/Baustelle";
import Maschine from "./pages/Maschine/Maschine";
import Adminpage from "./pages/Admin-page/Adminpage";
import EinplanungPage from "./pages/einplanung-page/einplanung-page";
import './App.css';
import ABWseite from "./pages/Abwesenheit/ABWseite"
import ProfilSeite from "./pages/ProfilSeite/ProfilSeite"
import Hilfe from "./pages/Hilfe/Hilfe"

function App() {

  const { user } = useContext(Context);

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const headerWidth = divRef.current.offsetWidth;
    setWidth(headerWidth);
  }, []
  );

  return (
    <div className="App" ref={divRef}>
      <Header width={width} />
      <Switch>
        <Route exact path="/"
          component={() => user ?
            <Homepage /> :
            <LoginPage />
          }
        />

        <Route exact path="/test" component={Test} />
        {
          user ? (
            <Switch>
               <Route exact path="/profilSeite" component={ProfilSeite} />
              <Route exact path="/maschine" component={Maschine} />
              <Route exact path="/hilfe" component={Hilfe} />
              <Route exact path="/baustelle" component={Baustelle} />
              <Route exact path="/admin" component={Adminpage} />
              <Route exact path="/einplanung" component={EinplanungPage} />
              <Route exact path="/abwesenheit" component={ABWseite} />
            </Switch>
          ) : (
            <Route path="/:someRoute" component={NotFound} />
          )
        }

      </Switch>
    </div>
  );
}

const NotFound = () => {

  const notFoundStyle = {
    marginTop: "70px"
  }

  return (
    <h1 style={notFoundStyle}>Seite ist nicht verfügbar</h1>
  )
}

export default App;
