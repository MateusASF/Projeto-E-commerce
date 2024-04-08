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
          descricao: " O Rolex Marine é um modelo de relógio de luxo conhecido por sua robustez e precisão. Com uma estética que combina elegância e funcionalidade, este modelo é frequentemente escolhido por profissionais e entusiastas de atividades marítimas. Sua caixa resistente à água e materiais de alta qualidade asseguram durabilidade mesmo nas condições mais adversas. O design do Rolex Marine é atemporal, com um mostrador de fácil leitura e uma luneta que pode ser utilizada para medir períodos de tempo. Além disso, sua mecânica sofisticada garante um desempenho excepcional, refletindo o compromisso da marca com a excelência em relojoaria."
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
          descricao: " O Rolex Marine é um modelo de relógio de luxo conhecido por sua robustez e precisão. Com uma estética que combina elegância e funcionalidade, este modelo é frequentemente escolhido por profissionais e entusiastas de atividades marítimas. Sua caixa resistente à água e materiais de alta qualidade asseguram durabilidade mesmo nas condições mais adversas. O design do Rolex Marine é atemporal, com um mostrador de fácil leitura e uma luneta que pode ser utilizada para medir períodos de tempo. Além disso, sua mecânica sofisticada garante um desempenho excepcional, refletindo o compromisso da marca com a excelência em relojoaria."
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
          descricao: " O Rolex Marine é um modelo de relógio de luxo conhecido por sua robustez e precisão. Com uma estética que combina elegância e funcionalidade, este modelo é frequentemente escolhido por profissionais e entusiastas de atividades marítimas. Sua caixa resistente à água e materiais de alta qualidade asseguram durabilidade mesmo nas condições mais adversas. O design do Rolex Marine é atemporal, com um mostrador de fácil leitura e uma luneta que pode ser utilizada para medir períodos de tempo. Além disso, sua mecânica sofisticada garante um desempenho excepcional, refletindo o compromisso da marca com a excelência em relojoaria."
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
          descricao: " O Rolex Marine é um modelo de relógio de luxo conhecido por sua robustez e precisão. Com uma estética que combina elegância e funcionalidade, este modelo é frequentemente escolhido por profissionais e entusiastas de atividades marítimas. Sua caixa resistente à água e materiais de alta qualidade asseguram durabilidade mesmo nas condições mais adversas. O design do Rolex Marine é atemporal, com um mostrador de fácil leitura e uma luneta que pode ser utilizada para medir períodos de tempo. Além disso, sua mecânica sofisticada garante um desempenho excepcional, refletindo o compromisso da marca com a excelência em relojoaria."
        },
      ],
    };
  }

  infoProduto(product: any): void {
    sessionStorage.setItem('product', JSON.stringify(product));
    location.href = '/produtos/info';
  }

  cadastrarProduto(): void {
    location.href = '/produtos/cadastrar';
  }

  editarProduto(): void {
    location.href = '/produtos/editar';
  }
}
