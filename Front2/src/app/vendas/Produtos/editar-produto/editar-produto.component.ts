import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {

  produtos: any;
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
        this.produtos = data;
        this.categories = this.extrairCategorias(this.produtos);
      });
    } catch (error) {
      console.error('Error:', error);
    }
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



  inativarProduto(id: any) {
    if (confirm('Tem certeza que deseja inativar este produto?')) {
      try {
        fetch(`http://localhost:3009/inativarProduto`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto inativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here
      }
    }
  }

    ativarProduto(id: any) {
    if (confirm('Tem certeza que deseja ativar este produto?')) {
      try {
        fetch(`http://localhost:3009/ativarProduto`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Produto ativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  editarProduto(produto: any) {
    console.log('Produto editado:', produto);
  }
}
