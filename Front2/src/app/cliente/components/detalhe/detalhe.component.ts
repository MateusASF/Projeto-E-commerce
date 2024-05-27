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
  trocas: any[] = [];

  async ngOnInit() {
    this.cliente = JSON.parse(localStorage.getItem('cliente')!);
    this.enderecos = this.cliente.enderecos;
    this.cartoes = this.cliente.cartoes;

    this.showSection('dadosPessoais');

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
            compra.totalItens = 0;
            for (let i = 0; i < compra.itens.length; i++) {
              compra.totalItens += compra.itens[i].quantidade;
            }
          });
          console.log(this.compras);
        });
    } catch (error) {
      
    }

    try {
      await fetch('http://localhost:3009/listarTrocasPorId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: this.cliente.id})
      })
        .then((response) => response.json())
        .then((data) => {
          this.trocas = data;
          this.trocas.forEach((troca:any) => {
            troca.totalItens = 0;
            for (let i = 0; i < troca.itens.length; i++) {
              troca.totalItens += troca.itens[i].quantidade;
              if (troca.status != 'TROCA FINALIZADA') {
                troca.cupom = "";
              }
            }
          });
          console.log(this.trocas);
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
      tipo: 'Troca'
    }));
    location.href = 'produtos/troca/devolucao';   
  }

  devolver(codCompra : any){
    localStorage.setItem('tipo-troca-devolucao', JSON.stringify({
      codCompra: codCompra,
      tipo: 'Devolução'
    }));
    location.href = 'produtos/troca/devolucao';   
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

  postarProdutos(id: any){
    try {
      fetch('http://localhost:3009/atualizarStatusTrocaDevolucao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: 'PRODUTOS POSTADOS'
        })
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Produtos postados com sucesso');
          location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  }

  postarProdutosCompra(id: any){
    try {
      fetch('http://localhost:3009/atualizarStatusVendaCompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          status: 'PRODUTOS POSTADOS'
        })
      })
        .then((response) => response.json())
        .then((data) => {
          alert('Produtos postados com sucesso');
          location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  }


  showSection(sectionId: any) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      (section as HTMLElement).style.display = 'none'; // Esconde todas as seções
    });
    document.getElementById(sectionId)!.style.display = 'block'; // Mostra a seção solicitada
  }
  
}
