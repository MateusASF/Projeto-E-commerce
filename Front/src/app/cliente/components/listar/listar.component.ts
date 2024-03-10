import { Component } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  clientes: any[] = [];
  cpf: string = '';
  nome: string = '';
  email: string = '';

  ngOnInit() {
    try {
      fetch('http://localhost:3009/listar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        this.clientes = data;
        // Handle the response data here
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }

  inativarCliente(id: number) {
    if (confirm('Tem certeza que deseja inativar este usuário?')) {
      try {
        fetch(`http://localhost:3009/inativar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente inativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here
      }
    }
  }

    ativarCliente(id: number) {
    if (confirm('Tem certeza que deseja ativar este usuário?')) {
      try {
        fetch(`http://localhost:3009/ativar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente ativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here
      }
    }
  }

  filtrarClientes() {
    let filtro: any = {};

    if (this.cpf.trim() !== '') {
      filtro.cpf = this.cpf.trim();
    }

    if (this.nome.trim() !== '') {
      filtro.nome = this.nome.trim();
    }

    if (this.email.trim() !== '') {
      filtro.email = this.email.trim();
    }

    // Aqui você pode usar o filtro para fazer a busca
    console.log('Filtro:', filtro);
  }
}
