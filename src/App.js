import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {Cars} from "./cars"

class App extends React.Component {

  constructor(props) {
    super(props);
    let cars = Cars.cars;
    console.log(cars,"CARS1")
    Cars.insertCar({
      brand: "ford",
      year: "2020",
      madein: "usa",
      maxspeed: "111"
    });
    console.log(cars,"CARS2")
    this.state = { loading: false };
  }

  componentDidMount() {

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
