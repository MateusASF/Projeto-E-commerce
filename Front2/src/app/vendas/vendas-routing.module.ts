import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VendasComponent } from './vendas.component';
import { CadastrarProdutoComponent } from './Produtos/cadastrar-produto/cadastrar-produto.component';
import { ListarProdutosComponent } from './Produtos/listar-produtos/listar-produtos.component';
import { EditarProdutoComponent } from './Produtos/editar-produto/editar-produto.component';
import { InfoProdutoComponent } from './Produtos/info-produto/info-produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';


const routes: Routes = [
  { path: '', component: VendasComponent,
    children: [
      {
        path: '',
        component: ListarProdutosComponent,
      },
      {
        path: 'cadastrar',
        component: CadastrarProdutoComponent
      },
      {
        path: 'editar',
        component: EditarProdutoComponent
      },
      {
        path: 'info',
        component: InfoProdutoComponent
      },
      {
        path: 'carrinho',
        component: CarrinhoComponent
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
export class VendasRoutingModule { }
