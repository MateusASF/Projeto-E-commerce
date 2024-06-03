import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, Point, BubbleDataPoint } from 'chart.js/auto';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})

export class ListarVendasComponent {

  @ViewChild('lineChart') private chartRef!: ElementRef;
  chart!: Chart;


  vendas: any[] = [];
  trocas: any[] = [];
  appComponent: any;

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

    this.showSection('vendas');
    this.createChart();
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
      case 'EM DEVOLUÇÃO':
        venda.status = 'PEDIDO FINALIZADO';
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

  showSection(sectionId: any) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      (section as HTMLElement).style.display = 'none'; // Esconde todas as seções
    });
    document.getElementById(sectionId)!.style.display = 'block'; // Mostra a seção solicitada
  }

  createChart(): void {
    // Extrair os dados relevantes
    const vendasPorItemPorMesAno = this.vendas.reduce((acc, venda) => {
      const data = new Date(venda.data);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
      venda.itens.forEach((item: { nome: any; quantidade: any; }) => {
        const chave = `${item.nome}`;
        if (!acc[chave]) {
          acc[chave] = {};
        }
        if (!acc[chave][mesAno]) {
          acc[chave][mesAno] = 0;
        }
        acc[chave][mesAno] += item.quantidade; // Somar a quantidade vendida
      });
      return acc;
    }, {} as { [key: string]: { [key: string]: number } });
  
    var allMesAno = Array.from(new Set(this.vendas.map(venda => {
      const data = new Date(venda.data);
      return `${data.getMonth() + 1}/${data.getFullYear()}`;
    }))).sort((a, b) => new Date(parseInt(a.split('/')[1]), parseInt(a.split('/')[0]) - 1).getTime() - new Date(parseInt(b.split('/')[1]), parseInt(b.split('/')[0]) - 1).getTime())

    const labels = Object.keys(vendasPorItemPorMesAno);
    var datasets = Object.entries(vendasPorItemPorMesAno).map(([item, vendasPorMes]: [string, unknown]) => ({
      label: item,
      data: allMesAno.map(mesAno => (vendasPorMes as { [key: string]: number })[mesAno] || 0),
      borderColor: this.getRandomColor(),
      fill: false
    }));
  
    // Criar o gráfico
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: allMesAno,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Períodos dos Meses'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Quantidade'
            }
          }
        }
      }
    });
  }
  
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  updateChartData(startDate: Date, endDate: Date): void {
    // Filtrar as vendas pelo período selecionado
    const filteredVendas = this.vendas.filter(venda => {
      const data = new Date(venda.data);
      return data >= startDate && data <= endDate;
    });
  
    // Extrair os dados relevantes para o período filtrado
    const vendasPorItemPorMesAno = filteredVendas.reduce((acc, venda) => {
      const data = new Date(venda.data);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
      venda.itens.forEach((item: { nome: any; quantidade: any; }) => {
        const chave = `${item.nome}`;
        if (!acc[chave]) {
          acc[chave] = {};
        }
        if (!acc[chave][mesAno]) {
          acc[chave][mesAno] = 0;
        }
        acc[chave][mesAno] += item.quantidade; // Somar a quantidade vendida
      });
      return acc;
    }, {} as { [key: string]: { [key: string]: number } });
  
    // Extrair todos os meses/anos únicos para as labels do eixo X
    const allMesAno = Array.from(new Set(filteredVendas.map(venda => {
      const data = new Date(venda.data);
      return `${data.getMonth() + 1}/${data.getFullYear()}`;
    }))).sort((a, b) => new Date(parseInt(a.split('/')[1]), parseInt(a.split('/')[0]) - 1).getTime() - new Date(parseInt(b.split('/')[1]), parseInt(b.split('/')[0]) - 1).getTime())
  
    // Construir os datasets
    const datasets = Object.entries(vendasPorItemPorMesAno).map(([item, vendasPorMes]) => ({
      label: item,
      data: allMesAno.map(mesAno => (vendasPorMes as { [key: string]: number })[mesAno] || 0),
      borderColor: this.getRandomColor(),
      fill: false
    }));
  
    // Atualizar o gráfico
    this.chart.data.labels = allMesAno;
    this.chart.data.datasets = datasets;
    this.chart.update();
  }
  
  onDateChange(event: any): void {
    const startDate = new Date((document.getElementById('startDate') as HTMLInputElement).value);
    const endDate = new Date((document.getElementById('endDate') as HTMLInputElement).value);
  
    if (startDate && endDate) {
      this.updateChartData(startDate, endDate);
    }
  }
  
  
}
