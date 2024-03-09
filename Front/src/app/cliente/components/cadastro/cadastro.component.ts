import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(''),
      nascimento: new FormControl(''),
      generoForm: new FormGroup({
        genero: new FormControl('')
      }),
      cpf: new FormControl(''),
      telefone: new FormControl(''),
      tipoTelefoneForm: new FormGroup({
        tipoTelefone: new FormControl('')
      }),
      senha: new FormControl(''),
      email: new FormControl(''),
      logradouro: new FormControl(''),
      logradouroForm: new FormGroup({
        tipoLogradouro: new FormControl('')
      }),
      numero: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl(''),
      cep: new FormControl(''),
      residenciaForm: new FormGroup({
        tipoResidencia: new FormControl('')
      }),
      observacoes: new FormControl(''),
    });
  }

  onSubmit() {
      if (this.form.valid) {
        const formData = this.form.value;
        const json = JSON.stringify(formData);

        // fetch('http://localhost:3009/cadastro', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: json
        // })
        // .then(response => response.json())
        // .then(data => {
        //   console.log('Response:', data);
        //   // Handle the response data here
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        //   // Handle any errors here
        // });
    }
  }
}
