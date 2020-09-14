import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios, cargarUsuariosSuccess } from '../actions';
import { cargarUsuariosError } from './../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cargarUsuarios),
      mergeMap(() =>
        this.usuarioService.getUsers().pipe(
          map((usuarios) => cargarUsuariosSuccess({ usuarios })),
          catchError((err) => of(cargarUsuariosError({ payload: err })))
        )
      )
    )
  );
}
