import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './Produtos/cadastrar-produto/cadastrar-produto.component';
import { EditarProdutoComponent } from './Produtos/editar-produto/editar-produto.component';
import { InfoProdutoComponent } from './Produtos/info-produto/info-produto.component';
import { ListarProdutosComponent } from './Produtos/listar-produtos/listar-produtos.component';
import { AcompanharVendasComponent } from './acompanhar-vendas/acompanhar-vendas.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { GerarCupomComponent } from './cupons/gerar-cupom/gerar-cupom.component';
import { DevolucaoComponent } from './pedidos/devolucao/devolucao.component';
import { AcompanharPedidosComponent } from './pedidos/acompanhar-pedidos/acompanhar-pedidos.component';
import { TrocaComponent } from './pedidos/troca/troca.component';
import { VendasComponent } from './vendas.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { GraficoVendasComponent } from './grafico-vendas/grafico-vendas.component';
import { ListarCuponsComponent } from './cupons/listar-cupons/listar-cupons.component';
import { StatusPedidoComponent } from './pedidos/status-pedido/status-pedido.component';
import { ListarVendasComponent } from './listar-vendas/listar-vendas.component';


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
      },
      {
        path: 'finalizar-compra',
        component: FinalizarCompraComponent
      },
      {
        path: 'vendas',
        component: AcompanharVendasComponent
      },
      {
        path: 'devolucao',
        component: DevolucaoComponent
      },
      {
        path: 'troca',
        component: TrocaComponent
      },
      {
        path: 'gerar-cupom',
        component: GerarCupomComponent
      },
      {
        path: 'pedidos',
        component: AcompanharPedidosComponent
      },
      {
        path: 'grafico-vendas',
        component: GraficoVendasComponent
      },
      {
        path: 'listar-cupons',
        component: ListarCuponsComponent
      },
      {
        path: 'status-pedido',
        component: StatusPedidoComponent
      },
      {
        path: 'listar-vendas',
        component: ListarVendasComponent
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
