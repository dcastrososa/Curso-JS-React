import React from 'react';
import {
  Form, Icon, Input, Button, Alert,
  Card
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../store/actions/index';
import { validation, validateData } from './validations';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'phinxlab',
      pass: 'abc123',
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this); // maneja el envio del formulario
    this.inputChangeHandler = this.inputChangeHandler.bind(this); // maneja el cambio de los Input
  }

  inputChangeHandler(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {user: this.state.user, pass: this.state.pass}
    const valid = validation(data); 

    // si el usuario no ha ingresado usuario o pass, muestro el mensaje de error y retorno.
    if (!valid.valid) {
      this.setState({errors: valid.errors})
      return;
    }

    // si vino aca y habian errores, quito los mensajes de error
    this.setState({errors: []});

    const validData = validateData(data);

    // si es incorrecto el user o pass, muestro el mensaje de error y retorno
    if (!validData.valid) {
      this.setState({errors: validData.errors})
      return;
    }

    // si fueron validos los datos, ahora esta autenticado
    this.props.onSetSesion();
    this.props.history.push('/vehicles');
  }

  render() {
    const {errors, user, pass} = this.state;

    return(
      <div className="containerLogin">
        <Card className="cardLogin">
          <p className="titleLogin">ACCOUNT LOGIN</p>
          <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login">
            <Form.Item>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" name="user" value={user} onChange={this.inputChangeHandler} />
            </Form.Item>
            <Form.Item>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="pass" placeholder="Password" value={pass} onChange={this.inputChangeHandler} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <br />
        {errors.map((error, i) => (
          <Alert
            key={i}
            message="Error"
            description={error}
            type="error"
          />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetSesion: () => dispatch(actions.setSesion())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));
