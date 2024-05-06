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
  compras: any[] = [];

  async ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente')!);
    this.enderecos = this.cliente.enderecos;
    this.cartoes = this.cliente.cartoes;

    try {
      await fetch('http://localhost:3009/listarVendasComprasPorId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: this.cliente.id})
      })
        .then((response) => response.json())
        .then((data) => {
          this.compras = data;
          this.compras.forEach((compra:any) => {
            compra.totalItens = compra.itens.length;
          });
          console.log(this.compras);
        });
    } catch (error) {
      
    }


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

  detalhesVenda(compra: any){
    console.log(compra);
  }

  trocar(codCompra : any){
    localStorage.setItem('tipo-troca-devolucao', JSON.stringify({
      codCompra: codCompra,
      tipo: 'troca'
    }));
    location.href = 'produtos/troca';   
  }

  devolver(codCompra : any){
    localStorage.setItem('tipo-troca-devolucao', JSON.stringify({
      codCompra: codCompra,
      tipo: 'troca'
    }));
    location.href = 'produtos/devolucao';   
  }

  cancelar(compra : any){
    if (window.confirm('Você realmente deseja cancelar?')) {
      try {
        fetch('http://localhost:3009/atualizarStatusVendaCompra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: compra.id,
            status: 'CANCELADA'
          })
        })
          .then((response) => response.json())
          .then((data) => {
            location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  postarProdutos(compra: any){
    try {
      fetch('http://localhost:3009/atualizarStatusVendaCompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: compra.id,
          status: 'PRODUTOS POSTADOS'
        })
      })
        .then((response) => response.json())
        .then((data) => {
          location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  }

}
