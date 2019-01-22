import React from "react";
import "./App.css";
import { RoutesWithSesion, RoutesWithoutSesion } from './Components/Routes/Routes';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <>
        {this.props.isAuthenticated ? <RoutesWithSesion /> : <RoutesWithoutSesion />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
