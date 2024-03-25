import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-troca',
  templateUrl: './troca.component.html',
  styleUrls: ['./troca.component.css', '../../vendas.component.css']
})
export class TrocaComponent {
  form: any;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      codPedido: new FormControl(''),
      motivo: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
