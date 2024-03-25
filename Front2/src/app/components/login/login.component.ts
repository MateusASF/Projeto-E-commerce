import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  logar() {
    let cliente;
    if (
      this.form.get('email')?.value === 'admin@example.com' &&
      this.form.get('password')?.value === 'admin123'
    ) {
      location.href = '/produtos/listar-vendas';
    } else {
      try {
        fetch('http://localhost:3009/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.form.get('email')?.value,
            senha: this.form.get('password')?.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            cliente = data;
            console.log(cliente);
            if (cliente.length === 0) {
              alert('Usuário ou senha inválidos');
              return;
            }
            localStorage.setItem('cliente', JSON.stringify(cliente));
            alert('Login efetuado com sucesso');
            location.href = '/produtos/finalizar-compra';
          });
      } catch (error) {
        alert(error);
      }
    }
  }
}
