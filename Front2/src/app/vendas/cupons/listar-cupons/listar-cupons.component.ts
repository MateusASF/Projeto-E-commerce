import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-cupons',
  templateUrl: './listar-cupons.component.html',
  styleUrls: ['./listar-cupons.component.css', '../../vendas.component.css']
})
export class ListarCuponsComponent {
  cupons: any;

  constructor() {}

  ngOnInit() {
    this.cupons = [
      { id: 1, codCupom: 'Cupom 1', valor: 10, status: '1' },
      { id: 2, codCupom: 'Cupom 2', valor: 20, status: '1' },
      { id: 3, codCupom: 'Cupom 3', valor: 30, status: '1' },
      { id: 4, codCupom: 'Cupom 4', valor: 40, status: '1' },
      { id: 5, codCupom: 'Cupom 5', valor: 50, status: '1' }
    ];
  }

  inativarCupom(cupom: any) {
    if (cupom.status === '1') {
      cupom.status = '0';
    } else {
      cupom.status = '1';
    }
  }
}
