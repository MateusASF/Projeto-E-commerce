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

  excluirEndereco(id: any) {
    fetch('http://localhost:3009/excluirEndereco', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    .then(data => {
      console.log('Response:', data);
      location.href = 'cliente/listar';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  excluirCartao(id: any) {
    fetch('http://localhost:3009/excluirCartao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
    .then(data => {
      console.log('Response:', data);
      location.href = 'cliente/listar';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  adicionarEndereco() {
    location.href = 'cliente/adicionarEndereco';
  }

  adicionarCartao() {
    location.href = 'cliente/adicionarCartao';
  }

  editarDadosPessoais(){
    location.href = 'cliente/alterarUsuario';
  }
}
