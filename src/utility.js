import { message } from 'antd';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

// devuelve false si una cadena esta vacia.
export const spaceValidation = value => {
  return value.trim('') !== '';
}

// muestra un Alert de exito.
export const success = text => {
  message.success(text);
};


// muestra un alert de error
export const error = text => {
  message.error(text);
};


// busca el indice de un carro en un arreglo
export const searchIndexCars = (key, cars) => {
  let index = -1;
  cars.forEach((car, i) => {
    if (car.key === key) {
      index = i;
      return;
    }
  })

  if (index === -1) {
    throw "No existe este carro en el arreglo.";
  }
  return index;
}

// impide que se escriban letras en un input
export const preventLetters = e => {
	let tecla = ( document.all ) ? e.keyCode : e.which;
  if ( tecla == 13 || tecla == 8 )
    return true;
  let patron = /[1234567890\d]/;
  let te = String.fromCharCode( tecla );
  const test = patron.test( te );
  if (!test) {
    e.preventDefault();
  }
  return test;
}

// retorna los anos desde la fecha actual, hasta 250 anos anteriores
export const getYears = () => {
  const yearActual = new Date().getFullYear();
  let years = [];
  for ( let i = 0; i < 250; i++ ) {
    years.push({year: yearActual - i});
  }
  return years;
}