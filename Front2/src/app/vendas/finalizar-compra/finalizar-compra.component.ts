import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.css'],
})
export class FinalizarCompraComponent {
  adicionouEndereco: boolean = false;
  adicionouCartao = false;
  cliente: any = {};
  enderecosEntrega: any = [];
  enderecosCobranca: any = [];
  carrinho: any = {};
  total: number = 0;
  frete: number = 0;

  formCupom!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formCupom = new FormGroup({
      cupom: new FormControl(''),
    });
    this.cliente = JSON.parse(localStorage.getItem('cliente') || '{}')[0];
    this.carrinho = JSON.parse(localStorage.getItem('cart') || '{}');

    this.enderecosEntrega = this.cliente.enderecos.filter(
      (endereco: any) =>
        endereco.tipoEndereco === 'Entrega' || endereco.tipoEndereco === 'Ambos'
    );
    this.enderecosCobranca = this.cliente.enderecos.filter(
      (endereco: any) =>
        endereco.tipoEndereco === 'Cobrança' ||
        endereco.tipoEndereco === 'Ambos'
    );

    this.total = this.carrinho.reduce(
      (acc: number, item: any) => acc + item.product.preco * item.quantity,
      0
    );

    this.calcularFrete();
  }

  calcularFrete() {
    this.frete = Math.floor(Math.random() * (78 - 15 + 1)) + 15;
  }

  adcionarEndereco(div: string) {
    this.adicionouEndereco = true;
    // Implement your code here to add the address fields in the HTML
    const enderecoDiv = document.createElement('div');
    enderecoDiv.innerHTML = `
  <div class="blockForm">
    <div class="form-group">
      <label for="logradouro">Logradouro:</label>
      <input type="text" id="logradouro" name="logradouro">
    </div>
    <div class="form-group">
      <label for="tipoLogradouro">Tipo de Logradouro:</label>
      <input type="text" id="tipoLogradouro" name="tipoLogradouro">
    </div>
    <div class="form-group">
      <label for="numero">Número:</label>
      <input type="text" id="numero" name="numero">
    </div>
    <div class="form-group">
      <label for="bairro">Bairro:</label>
      <input type="text" id="bairro" name="bairro">
    </div>
  </div>
  <div class="blockForm">
    <div class="form-group">
      <label for="cidade">Cidade:</label>
      <input type="text" id="cidade" name="cidade">
    </div>
    <div class="form-group">
      <label for="estado">Estado:</label>
      <input type="text" id="estado" name="estado">
    </div>
    <div class="form-group">
      <label for="pais">País:</label>
      <input type="text" id="pais" name="pais">
    </div>
    <div class="form-group">
      <label for="cep">CEP:</label>
      <input type="text" id="cep" name="cep">
    </div>
  </div>
  <div class="blockForm">
    <div class="form-group">
      <label for="tipoResidencia">Tipo de Residência:</label>
      <input type="text" id="tipoResidencia" name="tipoResidencia">
    </div>
    <div class="form-group">
      <label for="observacoes">Observações:</label>
      <input type="text" id="observacoes" name="observacoes">
    </div>
    <div class="form-group">
      <label for="identificacao">Identificação:</label>
      <input type="text" id="identificacao" name="identificacao">
    </div>
    <div class="form-group">
      <label for="adicionarPerfil">Adicionar ao Perfil:</label>
      <label>Sim</label>
      <input type="radio" name="opcao" value="Sim" checked>
      <label>Não</label>
      <input type="radio" name="opcao" value="Não">
    </div>
  </div>
    `;
    if (div != 'entrega') {
      const enderecoContainer = document.getElementById(
        'enderecoEntrega-container'
      );
      if (enderecoContainer) {
        enderecoContainer.appendChild(enderecoDiv);
      }
    } else {
      const enderecoContainer = document.getElementById(
        'enderecoCobranca-container'
      );
      if (enderecoContainer) {
        enderecoContainer.appendChild(enderecoDiv);
      }
    }
  }

  adicionarCartao() {
    this.adicionouCartao = true;
    const cartaoDiv = document.createElement('div');
    cartaoDiv.innerHTML = `
    <class="blockForm">
      <div class="form-group">
        <label for="numeroCartao">Número</label>
        <input type="text"  id="numeroCartao">
      </div>
      <div class="form-group">
        <label for="nomeCartao">Nome</label>
        <input type="text"  id="nomeCartao">
      </div>
      <div class="form-group">
        <label for="bandeira">Bandeira</label>
        <select id="bandeira">
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cvv">CVV</label>
        <input type="text"  id="cvv">
      </div>
      <div class="form-group">
        <label for="adicionarPerfil">Adicionar ao Perfil:</label>
        <label>Sim</label>
        <input type="radio" name="opcao" value="Sim" checked>
        <label>Não</label>
        <input type="radio" name="opcao" value="Não">
      </div>
    </div>`;
    const cartaoContainer = document.getElementById('cartao-container');
    if (cartaoContainer) {
      cartaoContainer.appendChild(cartaoDiv);
    }
  }

  inserirCupom() {
    let cupom = this.formCupom.value.cupom;
    switch (cupom) {
      case 'TROCATUDO':
        this.calcularTotalDesconto(this.total);
        this.removerPagamento(null);
        break;
      case 'BEMVINDO':
        this.calcularTotalDesconto(this.total * 0.1);
        break;
      case 'SECRET':
        this.calcularTotalDesconto(this.total * 0.9999);
        break;
      default:
        alert('Cumpom Inváido');
        break;
    }
  }

  calcularTotalDesconto(desconto: number) {
    this.total -= desconto;
  }

  removerPagamento(id?: string | any) {
    let elemento = document.querySelector('.infoPagamento');
    if (elemento && !id) {
      elemento.remove();
    } else if (elemento && id){
      elemento = document.querySelector('.doisCartoes')!;
      elemento.remove();
    }
  }

  limparCupom() {
    location.reload();
  }

  finalizarCompra() {
    alert("compra finalizada");
    localStorage.removeItem('cart');
    location.href = 'http://localhost:4200';
  }

  pagarComDoisCartoes(escolha: boolean) {
    if (escolha){
      this.adicionouCartao = true;
      const cartaoDiv = document.createElement('div');
      cartaoDiv.innerHTML = `
      <div class="doisCartoes">
          <p>Cartão de crédito 1</p>
          <div class="blockForm">
            <div class="form-group">
              <label for="numeroCartao">Número</label>
              <input type="text"  id="numeroCartao">
            </div>
            <div class="form-group">
              <label for="nomeCartao">Nome</label>
              <input type="text"  id="nomeCartao">
            </div>
            <div class="form-group">
              <label for="bandeira">Bandeira</label>
              <select id="bandeira">
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
                <option value="discover">Discover</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input type="text"  id="cvv">
            </div>
            <div class="form-group">
              <label for="valor">Valor</label>
              <input type="text" id="valor">
            </div>
            <div class="form-group">
              <label for="adicionarPerfil">Adicionar ao Perfil:</label>
              <label>Sim</label>
              <input type="radio" name="opcaoCartaoUm" value="Sim" checked>
              <label>Não</label>
              <input type="radio" name="opcaoCartaoUm" value="Não">
            </div>
        </div

          <p>Cartão de crédito 2</p>
          <class="blockForm">
          <div class="form-group">
            <label for="numeroCartao">Número</label>
            <input type="text"  id="numeroCartao">
          </div>
          <div class="form-group">
            <label for="nomeCartao">Nome</label>
            <input type="text"  id="nomeCartao">
          </div>
          <div class="form-group">
            <label for="bandeira">Bandeira</label>
            <select id="bandeira">
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text"  id="cvv">
          </div>
          <div class="form-group">
            <label for="valor">Valor</label>
            <input type="text" id="valor"
          </div>
          <div class="form-group">
            <label for="adicionarPerfil">Adicionar ao Perfil:</label>
            <label>Sim</label>
            <input type="radio" name="opcaoCartaoDois" value="Sim" checked>
            <label>Não</label>
            <input type="radio" name="opcaoCartaoDois" value="Não">
          </div>
        </div>
      </div>`;
    const cartaoContainer = document.getElementById('cartao-container');
    if (cartaoContainer) {
      cartaoContainer.appendChild(cartaoDiv);
    }

    // Encontre todos os inputs de valor dentro da div recém-criada
    const valorInputs = cartaoDiv.querySelectorAll('input[id="valor"]');

    // Adicione o evento onblur a cada input de valor
    valorInputs.forEach(inputElement => {
      const input = inputElement as HTMLElement; // Type assertion para HTMLElement
      input.onblur = () => this.validarValor(parseFloat((input as HTMLInputElement).value)); // Use HTMLInputElement para acessar a propriedade 'value'
      });
    } else {
      this.removerPagamento("doisCartoes");
    }
  }

  validarValor(value: number) {
    if (value < 10 && this.total > 10) {
      alert("O valor em cada cartão não pode ser menos de R$10,00")
    }
  }
}
