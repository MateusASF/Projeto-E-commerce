import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteComponent } from './cliente.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListarComponent } from './components/listar/listar.component';
import { TrocarSenhaComponent } from './components/trocar-senha/trocar-senha.component';
import { DetalheComponent } from './components/detalhe/detalhe.component';

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
      },
      {
        path: 'trocar-senha',
        component: TrocarSenhaComponent
      },
      {
        path: 'detalhe',
        component: DetalheComponent
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
