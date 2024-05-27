import { Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { EmailService } from 'src/app/serviceMail/email.service';

@Component({
  selector: 'app-troca-devolucao',
  templateUrl: './troca-devolucao.component.html',
  styleUrls: ['./troca-devolucao.component.css', '../../../app.component.css']
})
export class TrocaDevolucaoComponent {
  appComponent = new AppComponent();
  products: any[] = [];
  produtos: any[] = [];
  venda: any = {};
  tipo: any;
  motivo: any;
  // exchangeData = {
  //   to_name: 'João',
  //   to_email: 'joao@gmail.com',
  //   codTroca: 'TR123456',
  //   motivo: 'Produto com defeito',
  //   itens: [
  //     {
  //       nome: 'Duo',
  //       marca: 'Rolex',
  //       modelo: 'Marine',
  //       quantidade: 1,
  //       valor: 14999
  //     },
  //     {
  //       nome: 'Yacth',
  //       marca: 'Rolex',
  //       modelo: 'Oster',
  //       quantidade: 1,
  //       valor: 5999
  //     }
  //   ],
  //   valor: 20998
  // };

  ngOnInit(): void {
    const page = JSON.parse(localStorage.getItem('tipo-troca-devolucao') || '{}');
    this.tipo = page.tipo;
    this.motivo = page.motivo;
    console.log(this.motivo)
    this.venda = JSON.parse(sessionStorage.getItem('pedido') || '{}');
    this.products = this.venda.itens;
    this.produtos = this.products.map(product => ({...product}));
  }

  constructor(private emailService: EmailService) { }


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
            status:  this.tipo,
          })
        })
          .then((response) => response.json())
          .then((data) => {
            alert("Troca efetuada com sucesso")
            location.href = "http://localhost:4200/cliente/detalhe";
          });
      } catch (error) {
        
      }
    } else {
      
      let vendaParaTroca = {
        id_usuario: this.venda.cliente.id,
        codTroca: 0,
        motivo: this.motivo,
        status: 'EM TROCA',
        itens: [] as any[],
        cupom: "",
        codCupom: "",
        valor: 0,
        porcentagem: null,
        statusCupom: "Não Usado",
        tipo: 'TROCA'
      };
      this.selectedProducts.forEach((product) => {
        const cod = this.appComponent.gerarCodigoAleatorio();
        vendaParaTroca.codTroca = Math.floor(Math.random() * 10000000);
        vendaParaTroca.itens = [];
        vendaParaTroca.itens.push({
          id_produto: product.id,
          quantidade: product.quantidade,
        });
        vendaParaTroca.codCupom = cod;
        vendaParaTroca.valor += product.preco * product.quantidade;
        vendaParaTroca.cupom = cod;
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

              alert("Troca efetuada com sucesso");
              // this.sendEmailTroca();
              location.href = "http://localhost:4200/cliente/detalhe";
              console.log(data);
            });
        } catch (error) {
          
        }
      });
    }
  }

  decreaseQuantity(id: any) {
    this.products.forEach((product) => {
      if (product.id === id && product.quantidade > 1) {
        product.quantidade--;
      }
    });
  }

  increaseQuantity(id: any) {
    this.products.forEach((product) => {
      this.produtos.forEach((produto) => {
        if ( product.id == id && produto.id == id && product.quantidade < produto.quantidade) {
          product.quantidade++;
        }
      });
    });
  }

  // sendEmailTroca() {
  //   this.emailService.sendEmailTroca(this.exchangeData).then(
  //     (response) => {
  //       console.log('E-mail de troca enviado com sucesso', response.status, response.text);
  //     },
  //     (error) => {
  //       console.error('Erro ao enviar o e-mail de troca', error);
  //     }
  //   );
  // }
}
