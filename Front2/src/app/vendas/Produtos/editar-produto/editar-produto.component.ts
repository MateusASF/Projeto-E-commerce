import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {

  produtos: any;

  ngOnInit(): void {
    this.produtos = {
      relogios: [
        {
          imagens: [
            '../../../../../assets/modeloRelogio.png',
            '../../../../../assets/modeloRelogio2.png',
            '../../../../../assets/modeloRelogio6.png',
          ],
          marca: 'Rolex',
          ano: 2020,
          nome: 'Duo',
          modelo: 'Marine',
          codRelogio: 14578,
          genero: 'Masculino',
          tamanho: '44m',
          preco: 14999,
          ativo: '1',
          categoria: 'slim'
        },
        {
          imagens: [
            '../../../../../assets/modeloRelogio.png',
            '../../../../../assets/modeloRelogio2.png',
            '../../../../../assets/modeloRelogio6.png',
          ],
          marca: 'Rolex',
          ano: 2020,
          nome: 'Duo',
          modelo: 'Marine',
          codRelogio: 14578,
          genero: 'Masculino',
          tamanho: '44m',
          preco: 14999,
          ativo: '1',
          categoria: 'slim'
        },
        {
          imagens: [
            '../../../../../assets/modeloRelogio.png',
            '../../../../../assets/modeloRelogio2.png',
            '../../../../../assets/modeloRelogio6.png',
          ],
          marca: 'Rolex',
          ano: 2020,
          nome: 'Duo',
          modelo: 'Marine',
          codRelogio: 14578,
          genero: 'Masculino',
          tamanho: '44m',
          preco: 14999,
          ativo: '1',
          categoria: 'slim'
        },
        {
          imagens: [
            '../../../../../assets/modeloRelogio.png',
            '../../../../../assets/modeloRelogio2.png',
            '../../../../../assets/modeloRelogio6.png',
          ],
          marca: 'Rolex',
          ano: 2020,
          nome: 'Duo',
          modelo: 'Marine',
          codRelogio: 14578,
          genero: 'Masculino',
          tamanho: '44m',
          preco: 14999,
          ativo: '0',
          categoria: 'slim'
        },
      ],
    };
  }



  inativarProduto(produto: any) {
    // if (confirm('Tem certeza que deseja inativar este produto?')) {
    //   try {
    //     fetch(`http://localhost:3009/inativar-produto`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ id: id })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Produto inativado:', data);
    //       location.reload();
    //     });
    //   } catch (error) {
    //     console.error('Error:', error);
    //     // Handle the error here
    //   }
    // }
    produto.ativo = '0';
  }

    ativarProduto(produto: any) {
    // if (confirm('Tem certeza que deseja ativar este produto?')) {
    //   try {
    //     fetch(`http://localhost:3009/ativar-produto`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ id: id })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Produto ativado:', data);
    //       location.reload();
    //     });
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // }
    produto.ativo = '1';
  }

  editarProduto(produto: any) {
    console.log('Produto editado:', produto);
  }
}
