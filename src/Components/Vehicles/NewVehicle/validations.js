import { spaceValidation, getYears } from './../../../utility';
import { countries } from './../../../countries';

export const validation = data => {
  let valid = true;
  let errors = [];
  if (!spaceValidation(data.brand)) {
    errors.push('La marca del vehiculo no puede estar en blanco');
    valid = false;
  } else if (!spaceValidation(data.year)) {
    errors.push('El ano del vehiculo no puede estar en blanco');
    valid = false;
  } else if (!spaceValidation(data.madein)) {
    errors.push('El origen del vehiculo no puede estar en blanco');
    valid = false;
  } else if (!spaceValidation(data.maxspeed)) {
    errors.push('La descripcion del vehiculo no puede estar en blanco');
    valid = false;
  } else if (!spaceValidation(data.description)) {
    errors.push('La descripcion del vehiculo no puede estar en blanco');
    valid = false;
  } else if (!spaceValidation(data.colors)) {
    errors.push('Debe agregar al menos 1 color');
    valid = false;
  } else if (!spaceValidation(data.ports)) {
    errors.push('La cantidad de puertas no puede estar en blanco');
    valid = false;
  } else if (!validProperty(countries, 'name', data.madein)) {
    errors.push('El pais no es valido.')
    valid = false;
  } else if (!validProperty(getYears(), 'year', data.year)) {
    errors.push('El ano no es valido');
    valid = false;
  }
  return {valid: valid, errors: errors}
}

export const validProperty = (data, key, value) => {
  let valid = false;
  data.forEach( element => {
    if (element[key].toString() === value.toString()) {
      valid = true;
      return;
    }
  })
  return valid;
}
