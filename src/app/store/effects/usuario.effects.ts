import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  cargarUsuario,
  cargarUsuarioSuccess,
  cargarUsuarioError,
} from '../actions';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarUsuario),
      mergeMap((action) => {
        return this.usuarioService.getUser(action.id).pipe(
          map((usuario) => cargarUsuarioSuccess({ usuario })),
          catchError((err) => of(cargarUsuarioError({ payload: err })))
        );
      })
    )
  );
}
