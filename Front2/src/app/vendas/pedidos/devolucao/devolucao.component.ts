import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.css', '../../vendas.component.css']
})
export class DevolucaoComponent {

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
