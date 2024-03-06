import { Component } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  clientes: any[] = [];

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

  deletarCliente(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        fetch(`http://localhost:3009/deletar`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente deleted:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here
      }
    }
  }
}
