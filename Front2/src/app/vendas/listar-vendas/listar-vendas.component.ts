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

  async ngOnInit() {
    this.appComponent = new AppComponent();
    try {
      await fetch('http://localhost:3009/listarVendasCompras', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.vendas = data;
          this.vendas.forEach((venda:any) => {
            venda.totalItens = 0;
            for (let i = 0; i < venda.itens.length; i++) {
              venda.totalItens += venda.itens[i].quantidade;
            }
          });
          console.log(this.vendas);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await fetch('http://localhost:3009/listarTrocas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.trocas = data;
          this.trocas.forEach((troca:any) => {
            troca.totalItens = 0;
            for (let i = 0; i < troca.itens.length; i++) {
              troca.totalItens += troca.itens[i].quantidade;
            }
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
    // location.reload();
  }

  async moverStatusTroca(troca:any){
    switch(troca.status){
      case 'APROVADA':
        troca.status = 'EM TRÂNSITO';
        break;
      case 'EM TRÂNSITO':
        troca.status = 'ENTREGUE';
        break;
      case 'EM TROCA':
        troca.status = 'TROCADO';
        break;
      case 'PRODUTOS POSTADOS':
        troca.status = 'PRODUTOS RECEBIDOS';
        break;
      case 'PRODUTOS RECEBIDOS':
        troca.status = 'TROCA FINALIZADA';
        break;
      case 'EM PROCESSAMENTO':
        troca.status = 'APROVADA';
        break;
    }

    try {
      await fetch('http://localhost:3009/atualizarStatusTrocaDevolucao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: troca.id,
          status: troca.status
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(troca.status != 'TROCA FINALIZADA'){
            location.reload();
          }
        });
    } catch (error) {
      
    }

    if (troca.status == 'TROCA FINALIZADA') {
      let cupomCode = await this.appComponent.gerarCodigoAleatorio();
      try {
        await fetch('http://localhost:3009/gerarCupom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            codCupom: cupomCode,
            valor: troca.valor,
            porcentagem: null,
            status: 'Não Usado',
            tipo: 'TROCA'
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert('Cupom gerado com sucesso, use o código ' + cupomCode + ' para obter desconto na próxima compra!');
            //location.reload();
          }); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  detalhesVenda(venda:any){
    console.log(venda);
  }

  async trocarDevolver(venda:any, escolha: any){
    if (escolha) {
      try {
        await fetch('http://localhost:3009/atualizarStatusTrocaDevolucao', {
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
        console.log(error);
      }
    } else {
      try {
        await fetch('http://localhost:3009/atualizarStatusTrocaDevolucao', {
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
        console.log(error);
      }
    }
    location.reload();
  }

  async trocarDevolverCompra(venda:any, escolha: any){
    if (escolha) {
      try {
        await fetch('http://localhost:3009/atualizarStatusVendaCompra', {
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
        console.log(error);
      }
    } else {
      try {
        await fetch('http://localhost:3009/atualizarStatusVendaCompra', {
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
        console.log(error);
      }
      location.reload();
    }

    // location.reload();
  }

  
}
