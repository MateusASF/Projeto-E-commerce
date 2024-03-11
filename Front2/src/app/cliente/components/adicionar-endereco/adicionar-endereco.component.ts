import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adicionar-endereco',
  templateUrl: './adicionar-endereco.component.html',
  styleUrls: ['./adicionar-endereco.component.css']
})
export class AdicionarEnderecoComponent {
  form: any = {};



  ngOnInit() {
    this.form = new FormGroup({
      bairro: new FormControl(''),
      cep: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      observacao: new FormControl(''),
      pais: new FormControl(''),
      tipoLogradouro: new FormControl(''),
      tipoResidencia: new FormControl(''),
      identificacao: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.idCliente = JSON.parse(localStorage.getItem('endereco')!).id;
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/adicionarEndereco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      .then(data => {
        console.log('Response:', data);
        location.href = 'cliente/listar';
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
