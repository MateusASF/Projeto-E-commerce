import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ClienteRoutingModule } from './cliente-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './components/listar/listar.component';
import { TrocarSenhaComponent } from './components/trocar-senha/trocar-senha.component';
import { DetalheComponent } from './components/detalhe/detalhe.component';

// import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CadastroComponent,
    ListarComponent,
    TrocarSenhaComponent,
    DetalheComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClienteModule { }
