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
    try {
      fetch('http://localhost:3009/listarVendasCompras', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.vendas = data;
          this.vendas.forEach((venda:any) => {
            venda.totalItens = venda.itens.length;
          });
          console.log(this.vendas);
        });
    } catch (error) {
      
    }
  }

  async moverStatus(venda:any){
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
      case 'EM PROCESSAMENTO':
        venda.status = 'APROVADA';
        break;
    }

    try {
      await fetch('http://localhost:3009/atualizarStatusVendaCompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: venda.id,
          status: venda.status
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      
    }
  }

  detalhesVenda(venda:any){
    console.log(venda);
  }
}
