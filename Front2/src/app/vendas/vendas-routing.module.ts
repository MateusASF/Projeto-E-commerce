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
import { ListarCuponsComponent } from './cupons/listar-cupons/listar-cupons.component';
import { FinalizarCompraComponent } from './finalizar-compra/finalizar-compra.component';
import { GraficoVendasComponent } from './grafico-vendas/grafico-vendas.component';
import { ListarVendasComponent } from './listar-vendas/listar-vendas.component';
import { InitTrocaDevolucaoComponent } from './pedidos/init-troca-devolucao/init-troca-devolucao.component';
import { StatusPedidoComponent } from './pedidos/status-pedido/status-pedido.component';
import { TrocaDevolucaoComponent } from './pedidos/troca-devolucao/troca-devolucao.component';
import { VendasComponent } from './vendas.component';


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
        path: 'troca/devolucao',
        component: InitTrocaDevolucaoComponent
      },
      {
        path: 'gerar-cupom',
        component: GerarCupomComponent
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
      },
      {
        path: 'troca-devolucao',
        component: TrocaDevolucaoComponent
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
