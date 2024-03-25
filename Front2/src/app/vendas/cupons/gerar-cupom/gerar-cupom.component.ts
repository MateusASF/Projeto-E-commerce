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
      codigoCupom: new FormControl(''),
      valorCupom: new FormControl(''),
    });
  }


  gerarCupom() {
    alert('Cupom gerado com sucesso!');
    const codigoCupom = this.formGerarCupom.get('codigoCupom').value;
    const valorCupom = this.formGerarCupom.get('valorCupom').value;
    const cupom = { codigo: codigoCupom, valor: valorCupom };
    localStorage.setItem('cupom', JSON.stringify(cupom));
  }
}
