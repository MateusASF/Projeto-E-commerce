import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alterar-cartao',
  templateUrl: './alterar-cartao.component.html',
  styleUrls: ['./alterar-cartao.component.css']
})
export class AlterarCartaoComponent {
  form: any = {};
  cartao: any = {};

  ngOnInit() {
    this.cartao = JSON.parse(localStorage.getItem('cartao')!).cartao;
    this.form = new FormGroup({
      numeroCartao: new FormControl(this.cartao.numeroCartao),
      nomeCliente: new FormControl(this.cartao.nomeCliente),
      bandeira: new FormControl(this.cartao.bandeira),
      cvv: new FormControl(this.cartao.cvv)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.idCliente = JSON.parse(localStorage.getItem('cartao')!).id;
      formData.idCartao = JSON.parse(localStorage.getItem('cartao')!).cartao.idCartao;
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/alterarCartao', {
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
