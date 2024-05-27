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
    try {
      fetch('http://localhost:3009/listarCupons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.cupons =  data;
          // this.cupons = this.cupons.filter((cupon: { valor: null; porcentagem: null; }) => cupon.valor !== null && cupon.porcentagem !== null);
        });
    }
    catch (error) {
      console.log(error);
    }
    
  }

}
