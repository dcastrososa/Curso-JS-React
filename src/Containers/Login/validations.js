import { spaceValidation } from './../../utility';
import { Cars } from './../../cars';

export const validation = data => {
  let valid = true;
  let errors = [];
  if (!spaceValidation(data.user)) {
    errors.push('Por favor introduzca el nombre de usuario.');
    valid = false;
  }  
  if (!spaceValidation(data.pass)) {
    errors.push('Por favor introduzca la contrasena');
    valid = false;
  }
  return {valid: valid, errors: errors};
}

export const validateData = data => {
  let valid = true;
  let errors = [];
  if (Cars.user !== data.user) {
    errors.push('Usuario incorrecto')
    valid = false;
  }
  if (Cars.pass !== data.pass) {
    errors.push('Contrasena incorrecta');
    valid = false;
  }
  return {valid: valid, errors: errors};
}