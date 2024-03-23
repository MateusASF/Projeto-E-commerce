import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarProdutoComponent } from './Produtos/cadastrar-produto/cadastrar-produto.component';
import { VendasRoutingModule } from './vendas-routing.module';
import { VendasComponent } from './vendas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarProdutosComponent } from './Produtos/listar-produtos/listar-produtos.component';
import { EditarProdutoComponent } from './Produtos/editar-produto/editar-produto.component';
import { InfoProdutoComponent } from './Produtos/info-produto/info-produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';



@NgModule({
  declarations: [
    VendasComponent,
    CadastrarProdutoComponent,
    ListarProdutosComponent,
    EditarProdutoComponent,
    InfoProdutoComponent,
    CarrinhoComponent,
    FinalizarCompraComponent
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendasModule { }
