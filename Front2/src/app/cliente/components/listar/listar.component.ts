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

    fetch('http://localhost:3009/filtrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filtro)
    })
    .then(response => response.json())
    .then(data => {
      this.clientes = data;
    });
  }

  detalheCliente (cliente: any) {
    localStorage.setItem('cliente', JSON.stringify(cliente));
    location.href = '/cliente/detalhe';
  }

  trocarSenha (id: number, senha: any) {
    sessionStorage.setItem('cliente', JSON.stringify({ id: id, senha: senha }));
    location.href = '/cliente/trocar-senha';
  }
}
