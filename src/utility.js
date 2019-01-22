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