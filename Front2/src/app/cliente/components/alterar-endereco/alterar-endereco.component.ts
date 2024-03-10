import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alterar-endereco',
  templateUrl: './alterar-endereco.component.html',
  styleUrls: ['./alterar-endereco.component.css']
})
export class AlterarEnderecoComponent {
  form: any = {};
  endereco: any = {};

  ngOnInit() {
    this.endereco = JSON.parse(localStorage.getItem('endereco')!).endereco;
    this.form = new FormGroup({
      bairro: new FormControl(this.endereco.bairro),
      cep: new FormControl(this.endereco.cep),
      cidade: new FormControl(this.endereco.cidade),
      estado: new FormControl(this.endereco.estado),
      logradouro: new FormControl(this.endereco.logradouro),
      numero: new FormControl(this.endereco.numero),
      observacao: new FormControl(this.endereco.observacoes),
      pais: new FormControl(this.endereco.pais),
      tipoLogradouro: new FormControl(this.endereco.tipoLogradouro),
      tipoResidencia: new FormControl(this.endereco.tipoResidencia)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
      formData.idCliente = JSON.parse(localStorage.getItem('endereco')!).id;
      formData.idEndereco = JSON.parse(localStorage.getItem('endereco')!).endereco.idEndereco;
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/alterarEndereco', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      .then(data => {
        console.log('Response:', data);
        // Handle the response data here
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors here
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}
