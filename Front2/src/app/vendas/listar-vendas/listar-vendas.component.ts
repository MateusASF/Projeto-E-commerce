import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css', '../vendas.component.css']
})
export class ListarVendasComponent {

  vendas: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.vendas = [
      {
        status: 'APROVADA',
        valor: 100.00,
        cliente: 'Cliente 1',
        qtdItens: 1,
        produtos: [
          {
            nome: 'Produto 1',
            quantidade: 1,
            valor: 100.00
          }
        ]
      },
      {
        status: 'EM TRÂNSITO',
        valor: 200.00,
        cliente: 'Cliente 2',
        qtdItens: 1,
        produtos: [
          {
            nome: 'Produto 2',
            quantidade: 2,
            valor: 100.00
          }
        ]
      },
      {
        status: 'EM TROCA',
        valor: 300.00,
        cliente: 'Cliente 3',
        qtdItens: 1,
        produtos: [
          {
            nome: 'Produto 3',
            quantidade: 3,
            valor: 100.00
          }
        ]
      }
    ];
  }

  moverStatus(venda:any){
    switch(venda.status){
      case 'APROVADA':
        venda.status = 'EM TRÂNSITO';
        break;
      case 'EM TRÂNSITO':
        venda.status = 'ENTREGUE';
        break;
      case 'EM TROCA':
        venda.status = 'TROCA AUTORIZADA';
        break;
    }
  }

  detalhesVenda(venda:any){
    console.log(venda);
  }
}
