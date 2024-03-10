import { Component } from '@angular/core';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent {
  cliente: any = {}
  enderecos: any[] = [];
  cartoes: any[] = [];

  ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente')!);
    this.enderecos = this.cliente.enderecos;
    this.cartoes = this.cliente.cartoes;
  }

  editarEndereco(endereco: any, id: any) {
    localStorage.setItem('endereco', JSON.stringify({endereco, id}));
    location.href = 'cliente/alterarEndereco';
  }

  editarCartao(cartao: any, id: any) {
    localStorage.setItem('cartao', JSON.stringify({cartao, id}));
    location.href = 'cliente/alterarCartao';
  }
}
