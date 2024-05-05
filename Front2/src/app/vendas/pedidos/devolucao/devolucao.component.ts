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
    sessionStorage.setItem('tipo-troca-devolucao', JSON.stringify({
      tipo: 'devolucao',
      motivo: 'não gostei'
    }));
    try {
      fetch('http://localhost:3009/listarVendasComprasComCod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codCompra: this.form.value.codPedido })
      })
        .then((response) => response.json())
        .then((data) => {
          const pedido = data[0];
          // pedido.itens.forEach((item:any) => {
          //   item.selected = false;
          // });
          if (pedido.status == 'ENTREGUE') {
            sessionStorage.setItem('pedido', JSON.stringify(pedido));
            window.location.href = 'produtos/troca-devolucao';
          } else {
            alert('Pedido não entregue, não é possível realizar a devolução.');
          }
        });
    } catch (error) {
      
    }
  }
}
