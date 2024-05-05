import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarProdutoComponent } from './Produtos/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './Produtos/editar-produto/editar-produto.component';
import { InfoProdutoComponent } from './Produtos/info-produto/info-produto.component';
import { ListarProdutosComponent } from './Produtos/listar-produtos/listar-produtos.component';
import { AcompanharVendasComponent } from './acompanhar-vendas/acompanhar-vendas.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GerarCupomComponent } from './cupons/gerar-cupom/gerar-cupom.component';
import { ListarCuponsComponent } from './cupons/listar-cupons/listar-cupons.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { GraficoVendasComponent } from './grafico-vendas/grafico-vendas.component';
import { AcompanharPedidosComponent } from './pedidos/acompanhar-pedidos/acompanhar-pedidos.component';
import { DevolucaoComponent } from './pedidos/devolucao/devolucao.component';
import { TrocaComponent } from './pedidos/troca/troca.component';
import { VendasRoutingModule } from './vendas-routing.module';
import { VendasComponent } from './vendas.component';
import { StatusPedidoComponent } from './pedidos/status-pedido/status-pedido.component';
import { ListarVendasComponent } from './listar-vendas/listar-vendas.component';
import { TrocaDevolucaoComponent } from './troca-devolucao/troca-devolucao.component';



@NgModule({
  declarations: [
    VendasComponent,
    CadastrarProdutoComponent,
    ListarProdutosComponent,
    EditarProdutoComponent,
    InfoProdutoComponent,
    CarrinhoComponent,
    FinalizarCompraComponent,
    DevolucaoComponent,
    TrocaComponent,
    GerarCupomComponent,
    AcompanharVendasComponent,
    AcompanharPedidosComponent,
    ListarCuponsComponent,
    GraficoVendasComponent,
    StatusPedidoComponent,
    ListarVendasComponent,
    TrocaDevolucaoComponent
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VendasModule { }
