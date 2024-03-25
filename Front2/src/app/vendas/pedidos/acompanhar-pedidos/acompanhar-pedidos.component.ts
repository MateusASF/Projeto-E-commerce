import { Component } from '@angular/core';

@Component({
  selector: 'app-acompanhar-pedidos',
  templateUrl: './acompanhar-pedidos.component.html',
  styleUrls: ['./acompanhar-pedidos.component.css', '../../vendas.component.css']
})
export class AcompanharPedidosComponent {


  constructor() { }

  ngOnInit(): void {
  }

  devolucao() {
    location.href = '/produtos/devolucao';
  }

  troca() {
    location.href = '/produtos/troca';
  }

  statusPedido() {
    location.href = '/produtos/status-pedido';
  }
}
