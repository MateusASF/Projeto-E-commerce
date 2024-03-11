import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adicionar-cartao',
  templateUrl: './adicionar-cartao.component.html',
  styleUrls: ['./adicionar-cartao.component.css']
})
export class AdicionarCartaoComponent {
  form: any = {};

  ngOnInit() {
    this.form = new FormGroup({
      numeroCartao: new FormControl(''),
      nomeCliente: new FormControl(''),
      bandeira: new FormControl(''),
      cvv: new FormControl('')
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      formData.idCliente = JSON.parse(localStorage.getItem('cartao')!).id;
      const json = JSON.stringify(formData);

      console.log(json);
      fetch('http://localhost:3009/adicionarCartao', {
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
