import { Component } from '@angular/core';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css']
})
export class FinalizarCompraComponent {
  cliente : any = {};
  carrinho : any = {};
  total : number = 0;
  constructor() { }

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem('cliente') || '{}')[0];
    this.carrinho = JSON.parse(localStorage.getItem('cart') || '{}');
    this.total = this.carrinho.reduce((acc : number, item : any) => acc + (item.product.preco * item.quantity), 0);
    console.log(this.cliente);
    console.log(this.carrinho);
  }
}
