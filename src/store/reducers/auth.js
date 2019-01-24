import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../utility';

const initialState = {
  isAuthenticated: false, // esta autenticado el usuario?
}

const setSesion = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_SESION: return setSesion(state, action);
    default:
      return state;
  }
}

export default reducer;