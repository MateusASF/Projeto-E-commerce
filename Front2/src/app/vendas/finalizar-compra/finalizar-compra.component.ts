import { Component } from '@angular/core';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent {
  cliente : any = {};
  enderecosEntrega : any = [];
  enderecosCobranca : any = [];
  carrinho : any = {};
  total : number = 0;
  frete : number = 0;
  constructor() { }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente') || '{}')[0];
    this.carrinho = JSON.parse(localStorage.getItem('cart') || '{}');

    this.enderecosEntrega = this.cliente.enderecos.filter((endereco : any) => endereco.tipoEndereco === 'Entrega' || endereco.tipoEndereco === 'Ambos');
    this.enderecosCobranca = this.cliente.enderecos.filter((endereco : any) => endereco.tipoEndereco === 'Cobrança' || endereco.tipoEndereco === 'Ambos');

    this.total = this.carrinho.reduce((acc : number, item : any) => acc + (item.product.preco * item.quantity), 0);

    this.calcularFrete();
  }


  calcularFrete() {
    this.frete = Math.floor(Math.random() * (78 - 15 + 1)) + 15;
  }
}
