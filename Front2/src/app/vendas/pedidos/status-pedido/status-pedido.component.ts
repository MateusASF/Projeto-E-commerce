import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css', '../../vendas.component.css']
})
export class StatusPedidoComponent {
  form: any;
  ngOnInit() {
    this.form = new FormGroup({
      codPedido: new FormControl('')
    });
  }

  onSubmit() {
    console.log('Pedido busacado com sucesso!');
  }
}
