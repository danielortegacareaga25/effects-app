import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from './../../store/app.reducers';
import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  susb: Subscription;
  usuario: Usuario;
  loading: boolean = false;
  error: any;
  constructor(private router: ActivatedRoute, private store: Store<AppState>) {
    this.susb = new Subscription();
  }

  ngOnInit(): void {
    this.susb.add(
      this.store.select('usuario').subscribe(({ user, loading, error }) => {
        this.usuario = user;
        this.loading = loading;
        this.error = error;
      })
    );
    this.susb.add(
      this.router.params.subscribe(({ id }) => {
        this.store.dispatch(cargarUsuario({ id }));
      })
    );
  }

  ngOnDestroy() {
    this.susb.unsubscribe();
  }
}
