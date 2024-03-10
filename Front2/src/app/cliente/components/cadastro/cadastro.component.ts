import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
import { ModalSenhaComponent } from '../modais/modal-senha/modal-senha.component';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  form!: FormGroup;
  // constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(''),
      nascimento: new FormControl(''),
      genero: new FormControl(''),
      cpf: new FormControl(''),
      telefones: new FormArray([
        new FormGroup({
          numeroTelefone: new FormControl(''),
          tipoTelefone: new FormControl('')
        })
      ]),
      senha: new FormControl(''),
      email: new FormControl('', []),
      enderecos: new FormArray([]),
      cartoes: new FormArray([])
    });
  }

  onSubmit() {
    if (this.form.valid) {

      this.abrirModalSenha();
      const formData = this.form.value;
      formData.nascimento = this.formatDate(formData.nascimento);
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json
      })
      .then(response => response.json())
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

    abrirModalSenha() {
      // const dialogRef = this.dialog.open(ModalSenhaComponent, {
      //   width: '400px',
      //   // Add any additional configuration options for the modal here
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   // Handle the result of the modal here if needed
      // });
  }

  fecharModalSenha() {
    // Implement code to close the modal here
  }

  confirmarSenha() {
    // Implement code to validate the password and proceed with the registration here
  }

  private formatDate(date: string): string {
    const parts = date.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  adicionarEndereco() {
    const enderecoFormGroup = new FormGroup({
      logradouro: new FormControl(''),
      tipoLogradouro: new FormControl(''),
      numero: new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      pais: new FormControl(''),
      cep: new FormControl(''),
      tipoResidencia: new FormControl(''),
      observacoes: new FormControl('')
    });

    (this.form.get('enderecos') as FormArray).push(enderecoFormGroup);
  }

  adicionarCartao() {
    const cartaoFormGroup = new FormGroup({
      numeroCartao: new FormControl(''),
      nomeCliente: new FormControl(''),
      bandeira: new FormControl(''),
      cvv: new FormControl('')
    });

    (this.form.get('cartoes') as FormArray).push(cartaoFormGroup);
  }

  get cartoesControls() {
    return this.form.get('cartoes') ? (this.form.get('cartoes') as FormArray).controls : [];
  }

  get enderecosControls() {
    return this.form.get('enderecos') ? (this.form.get('enderecos') as FormArray).controls : [];
  }

  get enderecoLength() {
    return (this.form.get('enderecos') as FormArray).length;
  }

  removerEndereco(){
    const lengthArray = (this.form.get('enderecos') as FormArray).length;
    (this.form.get('enderecos') as FormArray).removeAt(lengthArray - 1);
  }

  get cartaoLength() {
    return (this.form.get('cartoes') as FormArray).length;
  }

  removerCartao(){
    const lengthArray = (this.form.get('cartoes') as FormArray).length;
    (this.form.get('cartoes') as FormArray).removeAt(lengthArray - 1);
  }

}
