import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent {
  products: any;
  productsBackup: any;
  categories: any;

  constructor() {}

  ngOnInit() {
    this.categories = [] as any[];
    try {
      fetch('http://localhost:3009/relogios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        this.products = data;
        this.productsBackup = data;
        this.categories = this.extrairCategorias(this.products);
      });
    } catch (error) {
      console.error('Error:', error);
    }
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

  search() {
    const searchInputs = {
      marca: (document.getElementById('searchMarca') as HTMLInputElement)?.value,
      nome: (document.getElementById('searchNome') as HTMLInputElement)?.value,
      ano: parseInt((document.getElementById('searchAno') as HTMLInputElement)?.value),
      modelo: (document.getElementById('searchModelo') as HTMLInputElement)?.value,
      codRelogio: parseInt((document.getElementById('searchCodRelogio') as HTMLInputElement)?.value),
      genero: (document.getElementById('searchGenero') as HTMLInputElement)?.value,
      tamanho: (document.getElementById('searchTamanho') as HTMLInputElement)?.value,
      precoMin: parseFloat((document.getElementById('searchPrecoMin') as HTMLInputElement)?.value),
      precoMax: parseFloat((document.getElementById('searchPrecoMax') as HTMLInputElement)?.value),
      descricao: (document.getElementById('searchDescricao') as HTMLInputElement)?.value,
      categorias: [] as number[]
    };
  
    // Adicione categorias selecionadas ao array de categorias
    document.querySelectorAll('[type="checkbox"]:checked').forEach((checkbox: Element) => {
      const inputElement = checkbox as HTMLInputElement;
      searchInputs.categorias.push(parseInt(inputElement.value));
    });

    console.log(searchInputs); // Aqui você pode fazer o que quiser com o objeto searchInputs
    this.filtrarProdutos(searchInputs);
  }

  filtrarProdutos(filtros: any) {
    this.products = this.productsBackup.filter((produto: any) => {
      // Verificar se cada campo de filtro corresponde ao produto atual
      return (!filtros.marca || produto.marca.toLowerCase().includes(filtros.marca.toLowerCase())) &&
             (!filtros.nome || produto.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
             (!filtros.ano || produto.ano === filtros.ano) &&
             (!filtros.modelo || produto.modelo.toLowerCase().includes(filtros.modelo.toLowerCase())) &&
             (!filtros.codRelogio || produto.codRelogio === filtros.codRelogio) &&
             (!filtros.genero || produto.genero.toLowerCase().includes(filtros.genero.toLowerCase())) &&
             (!filtros.tamanho || produto.tamanho.toLowerCase().includes(filtros.tamanho.toLowerCase())) &&
             (!filtros.precoMin || produto.preco >= filtros.precoMin) &&
             (!filtros.precoMax || produto.preco <= filtros.precoMax) &&
             (!filtros.descricao || produto.descricao.toLowerCase().includes(filtros.descricao.toLowerCase())) &&
             // Verificar se pelo menos uma categoria do produto está presente nos filtros selecionados
             (!filtros.categorias.length || produto.categorias.some((categoria:any) => filtros.categorias.includes(categoria.id)));
    });
    console.log(this.products);
  }

  extrairCategorias(produtos: any) {
    produtos.forEach((produto:any) => {
      produto.categorias.forEach((categoria: any) => {
        if (!this.categories.some((c: any) => c.id === categoria.id)) {
        this.categories.push(categoria);
        }
      });
    });
    return this.categories;
  }
}
