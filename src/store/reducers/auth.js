import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../utility';

const initialState = {
  isAuthenticated: true,
  redirect: false
}

const setSesion = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    redirect: true
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