import React from 'react';
import {
  Form, Icon, Input, Button, Alert
} from 'antd';
import { Redirect } from 'react-router-dom';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {user: this.state.user, pass: this.state.pass}
    const valid = validation(data); 

    if (!valid.valid) {
      this.setState({errors: valid.errors})
      return;
    }

    this.setState({errors: []});

    const validData = validateData(data);

    if (!validData.valid) {
      this.setState({errors: validData.errors})
      return;
    }

    this.props.onSetSesion();
  }

  render() {
    if (this.props.redirect) { return (<Redirect to="/vehicles" />) }

    const {errors, user, pass} = this.state;

    return(
      <>
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

        {errors.map((error, i) => (
          <Alert
            key={i}
            message="Error"
            description={error}
            type="error"
            closable
          />
        ))}
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetSesion: () => dispatch(actions.setSesion())
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.auth.redirect
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
