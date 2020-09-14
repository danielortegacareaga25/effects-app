import { createReducer, on } from '@ngrx/store';
import { Usuario } from './../../models/usuario.model';
import {
  cargarUsuario,
  cargarUsuarioSuccess,
  cargarUsuarioError,
} from './../actions';

export interface usuarioState {
  id: string;
  user: Usuario;
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: usuarioState = {
  id: '',
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuarioReducer = createReducer(
  initialState,

  on(cargarUsuario, (state, { id }) => {
    return { ...state, loading: true, id };
  }),
  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...usuario },
    error: null,
  })),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    user: null,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function usuarioReducer(state, action) {
  return _usuarioReducer(state, action);
}
