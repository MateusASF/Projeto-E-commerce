import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ClienteRoutingModule } from './cliente-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './components/listar/listar.component';
import { TrocarSenhaComponent } from './components/trocar-senha/trocar-senha.component';
import { DetalheComponent } from './components/detalhe/detalhe.component';
import { AlterarEnderecoComponent } from './components/alterar-endereco/alterar-endereco.component';
import { AlterarCartaoComponent } from './components/alterar-cartao/alterar-cartao.component';
import { AlterarUsuarioComponent } from './components/alterar-usuario/alterar-usuario.component';
import { AdicionarCartaoComponent } from './components/adicionar-cartao/adicionar-cartao.component';
import { AlterarDadosPessoaisComponent } from './components/alterar-dados-pessoais/alterar-dados-pessoais.component';


@NgModule({
  declarations: [
    CadastroComponent,
    ListarComponent,
    TrocarSenhaComponent,
    DetalheComponent,
    AlterarEnderecoComponent,
    AlterarCartaoComponent,
    AlterarUsuarioComponent,
    AdicionarCartaoComponent,
    AlterarDadosPessoaisComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClienteModule { }
