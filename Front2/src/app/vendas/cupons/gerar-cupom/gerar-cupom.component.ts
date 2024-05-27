import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gerar-cupom',
  templateUrl: './gerar-cupom.component.html',
  styleUrls: ['./gerar-cupom.component.css', '../../vendas.component.css']
})
export class GerarCupomComponent {
  formGerarCupom: any;

  constructor() { }

  ngOnInit(): void {
    this.formGerarCupom = new FormGroup({
      codCupom: new FormControl(''),
      valor: new FormControl(null),
      porcentagem: new FormControl(null),
    });
  }


  gerarCupom() {
    let cupom = this.formGerarCupom.value;
    cupom.status = "Não Usado";
    cupom.tipo = "DESCONTO";
    try {
      fetch('http://localhost:3009/gerarCupom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formGerarCupom.value)
      })
        .then((data) => {
          console.log(data);
          alert("Cupom gerado com sucesso");
          location.href = "http://localhost:4200/produtos/listar-cupons";
        });
    } catch (error) {
      
    }
  }
}
