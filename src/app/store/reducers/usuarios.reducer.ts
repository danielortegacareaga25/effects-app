import { createReducer, on } from '@ngrx/store';
import { Usuario } from './../../models/usuario.model';
import {
  cargarUsuarios,
  cargarUsuariosSuccess,
  cargarUsuariosError,
} from './../actions';

export interface State {
  users: Usuario[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

const initialState: State = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usuariosReducer = createReducer(
  initialState,

  on(cargarUsuarios, (state) => {
    return { ...state, loading: true };
  }),
  on(cargarUsuariosSuccess, (state, { usuarios }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...usuarios],
    error: null,
  })),
  on(cargarUsuariosError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    users: [],
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function usuariosReducer(state, action) {
  return _usuariosReducer(state, action);
}
