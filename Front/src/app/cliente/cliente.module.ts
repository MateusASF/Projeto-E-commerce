import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ClienteRoutingModule } from './cliente-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './components/listar/listar.component';


@NgModule({
  declarations: [
    CadastroComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    FormsModule
    ]
})
export class ClienteModule { }
