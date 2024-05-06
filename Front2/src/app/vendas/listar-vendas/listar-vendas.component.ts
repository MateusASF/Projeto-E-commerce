import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css', '../vendas.component.css']
})
export class ListarVendasComponent {

  vendas: any[] = [];
  trocas: any[] = [];
  appComponent: any;

  constructor() { }

  ngOnInit(): void {
    this.appComponent = new AppComponent();
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
      console.log(error);
    }

    try {
      fetch('http://localhost:3009/listarTrocas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.trocas = data;
          this.trocas.forEach((troca:any) => {
            troca.totalItens = troca.itens.length;
          });
          console.log(this.trocas);
        });
    } catch (error) {
      console.log(error);
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
        venda.status = 'TROCADO';
        break;
      case 'PRODUTOS POSTADOS':
        venda.status = 'PRODUTOS RECEBIDOS';
        break;
      case 'PRODUTOS RECEBIDOS':
        venda.status = 'TROCA FINALIZADA';
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

    if (venda.status == 'TROCA FINALIZADA') {
      try {
        fetch('http://localhost:3009/gerarCupom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            codCupom: this.appComponent.gerarCodigoAleatorio(),
            valor: venda.total,
            porcentagem: null,
            status: 'Não Usado',
            tipo: 'TROCA'
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          }); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  detalhesVenda(venda:any){
    console.log(venda);
  }

  trocarDevolver(venda:any, escolha: any){
    if (escolha) {
      try {
        fetch('http://localhost:3009/atualizarStatusVendaCompra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: venda.id,
            status: 'TROCA AUTORIZADA'
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        
      }
    } else {
      try {
        fetch('http://localhost:3009/atualizarStatusVendaCompra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: venda.id,
            status: 'TROCA NEGADA'
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        
      }
    }

    location.reload();
  }

  
}
