import { Component } from '@angular/core';

@Component({
  selector: 'app-acompanhar-vendas',
  templateUrl: './acompanhar-vendas.component.html',
  styleUrls: ['./acompanhar-vendas.component.css', '../vendas.component.css']
})
export class AcompanharVendasComponent {

  constructor() { }

  ngOnInit(): void {
  }

  gerarCupom() {
    location.href = '/produtos/gerar-cupom';
  }

  listarCupons() {
    location.href = '/produtos/listar-cupons';
  }

  acompanharVendas() {
    location.href = '/login';
  }
}
