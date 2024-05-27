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
import { ListarVendasComponent } from './listar-vendas/listar-vendas.component';
import { InitTrocaDevolucaoComponent } from './pedidos/init-troca-devolucao/init-troca-devolucao.component';
import { StatusPedidoComponent } from './pedidos/status-pedido/status-pedido.component';
import { TrocaDevolucaoComponent } from './pedidos/troca-devolucao/troca-devolucao.component';
import { VendasRoutingModule } from './vendas-routing.module';
import { VendasComponent } from './vendas.component';



@NgModule({
  declarations: [
    VendasComponent,
    CadastrarProdutoComponent,
    ListarProdutosComponent,
    EditarProdutoComponent,
    InfoProdutoComponent,
    CarrinhoComponent,
    FinalizarCompraComponent,
    InitTrocaDevolucaoComponent,
    GerarCupomComponent,
    AcompanharVendasComponent,
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
