import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteComponent } from './cliente.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListarComponent } from './components/listar/listar.component';

const routes: Routes = [
  { path: '', component: ClienteComponent,
    children: [
      {
        path: '',
        component: CadastroComponent,
      },
      {
        path: 'listar',
        component: ListarComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
