import React from 'react';
import { Card, Form, Input, Alert, Button, Tag, AutoComplete } from 'antd';
import { validation } from './validations';
import { countries } from './../../../countries';
import { preventLetters, getYears, URL } from '../../../utility';
import Tags from './../../../tags';
import {dataColors} from './../../../dataColors';
import Fuse from 'fuse.js';
import axios from 'axios';

class NewVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();

    this.getInitialState = this.getInitialState.bind(this); // retorna mi estado inicial
    this.inputChangeHandler = this.inputChangeHandler.bind(this); // maneja el cambio de un input
    this.addColor = this.addColor.bind(this); // agrega un color al arreglo de colores
    this.removeColor = this.removeColor.bind(this); // remueve un color de el arreglo de colores
    this.handleSubmit = this.handleSubmit.bind(this); // maneja el envio del formulario
    this.handleSearch = this.handleSearch.bind(this); // maneja la busqueda en los Autocomplete Component
    this.setCountry = this.setCountry.bind(this); // "setea" el valor del pais escogido en el Autocomplete Component
    this.setYear = this.setYear.bind(this); // "setea" el valor del ano escogido en el Autocomplete Component
    this.emptyForm = this.emptyForm.bind(this); // limpia el formulario
    this.fetchSave = this.fetchSave.bind(this);
  }

  getInitialState() {
    const intialState = {
      brand: '',
      year: '',
      madein: '',
      maxspeed: '',
      description: '',
      colors: new Tags(),
      ports: '',
      errors: [],
      dataColor: [],
      dataCountry: [],
      dataYear: [],
      saving: false
    }
    return intialState;
  }

  // anos para el AutoComplete Component
  years = getYears();

  inputChangeHandler(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  setCountry(value) {
    this.setState({madein: value})
  }

  setYear(value) {
    this.setState({year: value});
  }

  // value: valor del input, key: propiedad a la que buscara en el array, 
  // data: donde buscara los resultados, property: donde establecera los resultados
  handleSearch(value, key, data, property) {
    const options = {
      keys: [key],
      threshold: 0
    }
    const fuse = new Fuse(data, options);
    const search = fuse.search(value);
    let result = [];
    if (!search.length === 0) {
      return;
    }

    result = search.map( value => {
      return value[key].toString();
    })
    this.setState({[property]: result})
  } 

  async handleSubmit(event)  {
    event.preventDefault();
    const data = {
      brand: this.state.brand,
      year: this.state.year,
      madein: this.state.madein,
      maxspeed: this.state.maxspeed,
      description: this.state.description,
      colors: this.state.colors.getTag().join(' / '),
      ports: this.state.ports,
      status: 1
    };

    const valid = validation(data);

    // si los datos de formulario no son validos, muestro los errores
    if (!valid.valid) {
      this.setState({errors: valid.errors})
      return;
    } 

    this.setState({saving: true})
    
    try {
      await this.fetchSave(data);
      this.props.onSave();
      this.emptyForm();
      this.setState({saving: false});
    }catch(err) {
      console.log('err', err)
    }
  }

  addColor(value) {
    let colors = {...this.state.colors};
    colors.addTag(value);
    this.setState({colors: colors, color: 'Rojo'})
  }

  removeColor(color) {
    let colors = {...this.state.colors};
    colors.removeTag(color);
    this.setState({colors: colors});
  }

  // limpia el formulario
  emptyForm() {
    this.setState(this.getInitialState());
  }

  fetchSave(data) {
    const car = data;
    return axios.post(`${URL}/cars.json`, car);
  }

  render() {
    const {brand, maxspeed, description, ports, errors, dataColor, dataCountry, dataYear, saving} = this.state;
    const colors = this.state.colors.getTag();

    return(
      
      <Card>
        <Form className="login-form" id="components-form-demo-normal-login">
          <Form.Item>
            <Input placeholder="Marca" name="brand" value={brand} onChange={this.inputChangeHandler} />
          </Form.Item>

          <Form.Item>
            <AutoComplete
              onBlur={this.setYear}
              placeholder="Año"
              dataSource={dataYear}
              onSearch={(value) => this.handleSearch(value, 'year', this.years, 'dataYear')}
              onSelect={this.setYear}
            />
          </Form.Item>

          <Form.Item>
            <AutoComplete
              onBlur={this.setCountry}
              placeholder="Pais de Origen"
              dataSource={dataCountry}
              onSearch={(value) => this.handleSearch(value, 'name', countries, 'dataCountry')}
              onSelect={this.setCountry}
            />
          </Form.Item>

          <Form.Item>
            <Input placeholder="Velocidad màxima (Km)" name="maxspeed" value={maxspeed} onChange={this.inputChangeHandler} onKeyPress={preventLetters} />
          </Form.Item>

          <Form.Item>
            <Input placeholder="Descripciòn" name="description" value={description} onChange={this.inputChangeHandler} />
          </Form.Item>

          <Form.Item>

            <AutoComplete 
              placeholder="Color" 
              dataSource={dataColor} 
              onSearch={(value) => this.handleSearch(value, 'name', dataColors, 'dataColor')}
              onSelect={this.addColor}
              allowClear={true}
             />

            {colors.map((color, i) => (
              <Tag closable={true} onClose={this.removeColor.bind(this, color)} key={i}>{color}</Tag>
            ))}
          </Form.Item>

          <Form.Item>
            <Input placeholder="Cantidad de puertas" name="ports" value={ports} onChange={this.inputChangeHandler} onKeyPress={preventLetters} />
          </Form.Item>

          {errors.map((error, i) => (
            <Alert
              key={i}
              message="Error"
              description={error}
              type="error"
            />
          ))}
          <br />

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit} loading={saving}>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default NewVehicle;
