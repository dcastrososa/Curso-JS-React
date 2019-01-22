import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {Cars} from "./cars"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    //EJEMPLO: login
    const ejUsuario="luciano";
    const ejClave="sss000";
    if (Cars.user === ejUsuario && Cars.pass === ejClave){
      //LoginOK! redirecciono a la pagina de listado!!!
      console.log("login ok!")
    }else{
      console.log("login error")
      //Genero un error:
      //throw new Error("Usuario y pass invalido")
      //y muestro el mensaje
    }

    let cars = Cars.cars;
    console.log(cars,"CARS1")
    //EJEMPLO: alta de de automovil
    Cars.insertCar({
      brand: "ford",
      year: "2020",
      madein: "usa",
      maxspeed: "111"
    });
    console.log(cars,"CARS2")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
