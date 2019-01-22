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

export const success = text => {
  message.success(text);
};

export const error = text => {
  message.error(text);
};

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