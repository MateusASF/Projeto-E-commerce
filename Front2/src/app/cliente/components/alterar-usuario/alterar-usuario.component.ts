import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent {
  form: any = {};
  cliente: any = JSON.parse(localStorage.getItem('cliente')!);

  ngOnInit() {
    console.log(this.cliente);
    this.form = new FormGroup({
      nome: new FormControl(this.cliente.nome),
      nascimento: new FormControl(this.cliente.nascimento.toString().split('T')[0]),
      genero: new FormControl(this.cliente.genero),
      cpf: new FormControl(this.cliente.cpf),
      numeroTelefone: new FormControl(this.cliente.telefones[0].numeroTelefone),
      tipoTelefone: new FormControl(this.cliente.telefones[0].tipoTelefone),
      email: new FormControl(this.cliente.email)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.nascimento = this.formatDate(formData.nascimento);
      formData.idCliente = this.cliente.id;
      formData.idTelefone = this.cliente.telefones[0].idTelefone;
      console.log(formData);
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/alterarCliente', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      .then(data => {
        console.log('Response:', data);
        location.href = '/cliente/listar';
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors here
      });
    } else {
      console.log('Formulário inválido');
    }
  }

  private formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }
}
