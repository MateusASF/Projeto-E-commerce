import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent {
  products: any;

  constructor() {}

  ngOnInit(): void {
    this.products = {
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
        },
      ],
    };
  }

  infoProduto(product: any): void {
    sessionStorage.setItem('product', JSON.stringify(product));
    location.href = '/produtos/info';
  }
}
