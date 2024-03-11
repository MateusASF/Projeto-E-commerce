import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ClienteComponent } from './cliente.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ListarComponent } from './components/listar/listar.component';
import { TrocarSenhaComponent } from './components/trocar-senha/trocar-senha.component';
import { DetalheComponent } from './components/detalhe/detalhe.component';
import { AlterarEnderecoComponent } from './components/alterar-endereco/alterar-endereco.component';
import { AlterarUsuarioComponent } from './components/alterar-usuario/alterar-usuario.component';
import { AlterarCartaoComponent } from './components/alterar-cartao/alterar-cartao.component';
import { AdicionarCartaoComponent } from './components/adicionar-cartao/adicionar-cartao.component';
import { AdicionarEnderecoComponent } from './components/adicionar-endereco/adicionar-endereco.component';

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
      },
      {
        path: 'alterarEndereco',
        component: AlterarEnderecoComponent
      },
      {
        path: 'alterarUsuario',
        component: AlterarUsuarioComponent
      },
      {
        path: 'alterarCartao',
        component: AlterarCartaoComponent
      },
      {
        path: 'adicionarEndereco',
        component: AdicionarEnderecoComponent
      },
      {
        path: 'adicionarCartao',
        component: AdicionarCartaoComponent
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
