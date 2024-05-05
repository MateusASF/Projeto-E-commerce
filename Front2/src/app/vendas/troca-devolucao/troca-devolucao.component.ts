import { Component } from '@angular/core';
import { AppComponent } from '../../app.component'; 

@Component({
  selector: 'app-troca-devolucao',
  templateUrl: './troca-devolucao.component.html',
  styleUrls: ['./troca-devolucao.component.css', '../../app.component.css']
})
export class TrocaDevolucaoComponent {
  appComponent = new AppComponent();
  products: any[] = [];
  venda: any = {};
  tipo: any;
  motivo: any;

  ngOnInit(): void {
    const page = JSON.parse(sessionStorage.getItem('tipo-troca-devolucao') || '{}');
    this.tipo = page.tipo;
    this.motivo = page.motivo;
    this.venda = JSON.parse(sessionStorage.getItem('pedido') || '{}');
    this.products = this.venda.itens;
  }

  selectedProducts: any[] = [];

  async finalizeReturn(): Promise<void> {
    this.selectedProducts = this.products.filter((product, index) => {
      const checkbox: HTMLInputElement = document.querySelector(`input[name="selectedProduct${index}"]`) as HTMLInputElement;
      return checkbox && checkbox.checked;
    });

    if (this.selectedProducts.length == this.products.length) {
      this.tipo = 'troca' ? 'EM TROCA' : 'DEVOLUÇÃO';
      try {
        await fetch('http://localhost:3009/atualizarStatusVendaCompra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.venda.id,
            status:  this.tipo
          })
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } catch (error) {
        
      }
    } else {

      const cod = this.appComponent.gerarCodigoAleatorio()
      let vendaParaTroca = {
        id_usuario: this.venda.cliente.id,
        codTroca: Math.floor(Math.random() * 10000000),
        motivo: this.motivo,
        status: 'EM TROCA',
        itens: [] as any[],
        cupom: cod,
        codCupom: cod,
        valor: this.venda.total,
        porcentagem: null,
        statusCupom: "Não Usado",
        tipo: 'TROCA'
      };
      this.selectedProducts.forEach((product) => {
        vendaParaTroca.itens = [];
        vendaParaTroca.itens.push({
          id_produto: product.id,
          quantidade: product.quantidade,
        });
        try {
          fetch('http://localhost:3009/inserirTroca', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vendaParaTroca)
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        } catch (error) {
          
        }
      });
    }
  }

  decreaseQuantity(id: any) {
    this.products.forEach((product) => {
      if (product.id === id) {
        product.quantidade--;
      }
    });
  }

  increaseQuantity(id: any) {
    this.products.forEach((product) => {
      if (product.id === id) {
        product.quantidade++;
      }
    });
  }

}
