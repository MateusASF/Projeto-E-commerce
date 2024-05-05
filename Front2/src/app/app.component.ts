import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clocks August';

  gerarCodigoAleatorio(): string {
    const gerarAleatorio = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    let numerosAleatorios = '';
    for (let i = 0; i < 3; i++) {
      numerosAleatorios += gerarAleatorio(0, 9).toString();
    }

    let letrasAleatorias = '';
    for (let i = 0; i < 7; i++) {
      const code = gerarAleatorio(65, 90); // ASCII codes for A-Z
      letrasAleatorias += String.fromCharCode(code);
    }

    let codigoAleatorio = numerosAleatorios + letrasAleatorias;
    codigoAleatorio = codigoAleatorio
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    return codigoAleatorio;
  }
}
