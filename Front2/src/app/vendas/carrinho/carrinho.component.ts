import { Component } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  produtosCarrinho = JSON.parse(localStorage.getItem('cart') || '{}');
  total = 0;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.produtosCarrinho);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = 0;
    for (const product of this.produtosCarrinho) {
      this.total += product.product.preco * product.quantity;
    }
  }

  removerProduto(index: number): void {
    this.produtosCarrinho.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.produtosCarrinho));
    this.calculateTotal();
  }

  diminuirQuantidade(index: any): void {
    if (index.quantity > 1) {
      index.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.produtosCarrinho));
      this.calculateTotal();
    }
  }

  aumentarQuantidade(index: any): void {
    index.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.produtosCarrinho));
    this.calculateTotal();
  }

  finalizarCompra(): void {
    location.href = '/login';
  }
}
