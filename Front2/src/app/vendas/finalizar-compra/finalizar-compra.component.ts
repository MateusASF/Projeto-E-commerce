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
  carrinho: any = {};
  total: number = 0;
  frete: number = 0;
  numeroCartaoSelecionado: any = {};
  idEnderecoSelecionado: any = {};

  formCupom!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formCupom = new FormGroup({
      cupom: new FormControl(''),
    });
    this.cliente = JSON.parse(localStorage.getItem('cliente') || '{}')[0];
    if (sessionStorage.getItem('carrinhoImediato')){
      this.carrinho = JSON.parse(sessionStorage.getItem('carrinhoImediato') || '{}');
    } else {
      this.carrinho = JSON.parse(localStorage.getItem('cart') || '{}');
    }

    this.enderecosEntrega = this.cliente.enderecos.filter(
      (endereco: any) =>
        endereco.tipoEndereco === 'Entrega' || endereco.tipoEndereco === 'Ambos'
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
  <div class="blockForm"  style="display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: center; margin-right: 10px">
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="logradouro">Logradouro:</label>
      <input type="text" id="logradouro" name="logradouro" 
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="tipoLogradouro">Tipo de Logradouro:</label>
      <input type="text" id="tipoLogradouro" name="tipoLogradouro"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="numero">Número:</label>
      <input type="text" id="numero" name="numero"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="bairro">Bairro:</label>
      <input type="text" id="bairro" name="bairro"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
  </div>
  <div class="blockForm"  style="display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: center; margin-right: 10px">
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="cidade">Cidade:</label>
      <input type="text" id="cidade" name="cidade"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="estado">Estado:</label>
      <input type="text" id="estado" name="estado"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="pais">País:</label>
      <input type="text" id="pais" name="pais"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="cep">CEP:</label>
      <input type="text" id="cep" name="cep"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
  </div>
  <div class="blockForm"  style="display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: center; margin-right: 10px">
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="tipoResidencia">Tipo de Residência:</label>
      <input type="text" id="tipoResidencia" name="tipoResidencia"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="observacoes">Observações:</label>
      <input type="text" id="observacoes" name="observacoes"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
      <label for="identificacao">Identificação:</label>
      <input type="text" id="identificacao" name="identificacao"      
      style="color: var(--secondary-color);
      font-family: var(--font-primary);
      background-color: var(--primary-color);
      border: none;
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      padding: 5px 1.5px;">
    </div>
    <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
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
    }
  }

  adicionarCartao() {
    this.adicionouCartao = true;
    const cartaoDiv = document.createElement('div');
    cartaoDiv.innerHTML = `
    <div class="blockForm"  style="display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: center; margin-right: 10px">
      <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
        <label for="numeroCartao">Número</label>
        <input type="text"  id="numeroCartao">
      </div>
      <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
        <label for="nomeCartao">Nome</label>
        <input type="text"  id="nomeCartao">
      </div>
      <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
        <label for="bandeira">Bandeira</label>
        <select id="bandeira">
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </div>
      <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
        <label for="cvv">CVV</label>
        <input type="text"  id="cvv">
      </div>
      <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px">
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
      default:+
      
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

  async finalizarCompra() {
    var adicionarEndereco = (document.querySelector('input[name="opcao"]:checked')  as HTMLInputElement)?.value

    var endereco = !this.adicionouEndereco ?  'enderecoSelecionado.value' : {
      idCliente: this.cliente.id,
      logradouro: (document.querySelector('input[name="logradouro"]') as HTMLInputElement)?.value,
      tipoLogradouro: (document.querySelector('input[name="tipoLogradouro"]') as HTMLInputElement)?.value,
      numero: (document.querySelector('input[name="numero"]') as HTMLInputElement)?.value,
      bairro: (document.querySelector('input[name="bairro"]') as HTMLInputElement)?.value,
      cidade: (document.querySelector('input[name="cidade"]') as HTMLInputElement)?.value,
      estado: (document.querySelector('input[name="estado"]') as HTMLInputElement)?.value,
      pais: (document.querySelector('input[name="pais"]') as HTMLInputElement)?.value,
      cep: (document.querySelector('input[name="cep"]') as HTMLInputElement)?.value,
      tipoResidencia: (document.querySelector('input[name="tipoResidencia"]') as HTMLInputElement)?.value,
      observacoes: (document.querySelector('input[name="observacoes"]') as HTMLInputElement)?.value,
      identificacao: (document.querySelector('input[name="identificacao"]') as HTMLInputElement)?.value,
      tipoEndereco: 'Entrega',
    };
    const cartoes = document.querySelectorAll('.cartoesMultiplos');
    let cartao1 = cartoes[0] ? {
      numero: (cartoes[0].querySelector('input[id="numeroCartao"]') as HTMLInputElement)?.value,
      nome: (cartoes[0].querySelector('input[id="nomeCartao"]') as HTMLInputElement)?.value,
      bandeira: (cartoes[0].querySelector('select[id="bandeira"]') as HTMLSelectElement)?.value,
      cvv: (cartoes[0].querySelector('input[id="cvv"]') as HTMLInputElement)?.value,
      valor: (cartoes[0].querySelector('input[id="valor"]') as HTMLInputElement)?.value ? (cartoes[0].querySelector('input[id="valor"]') as HTMLInputElement)?.value : this.total,
      adicionarPerfil: (cartoes[0].querySelector('input[name="opcaoCartaoDois"]:checked') as HTMLInputElement)?.value === 'Sim'
    } : this.numeroCartaoSelecionado;
    const cartao2 = cartoes[1] ? {
      numero: (cartoes[1].querySelector('input[id="numeroCartao"]') as HTMLInputElement)?.value,
      nome: (cartoes[1].querySelector('input[id="nomeCartao"]') as HTMLInputElement)?.value,
      bandeira: (cartoes[1].querySelector('select[id="bandeira"]') as HTMLSelectElement)?.value,
      cvv: (cartoes[1].querySelector('input[id="cvv"]') as HTMLInputElement)?.value,
      valor: (cartoes[1].querySelector('input[id="valor"]') as HTMLInputElement)?.value,
      adicionarPerfil: (cartoes[1].querySelector('input[name="opcaoCartaoDois"]:checked') as HTMLInputElement)?.value === 'Sim'
    } : null;
    let enderecoId = 0;

    if (this.adicionouEndereco) {;
      try {
        await fetch('http://localhost:3009/adicionarEndereco', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(endereco)
        })
        .then(async response => await response.json())
        .then(async data => {
          enderecoId = await data; // Retrieve the ID of the created address
          console.log('Endereço adicionado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao adicionar endereço:', error);
        });
      } catch (error) {
        
      }
    }
    console.log(enderecoId);
    let produtosCarrinho = [] as any[];

    this.carrinho.forEach((produto: any) => {
      produtosCarrinho.push({produto: produto.product.id, quantidade: produto.quantity});
    });

    const compra = {
      cliente: this.cliente.id,
      enderecoEntrega: enderecoId ? enderecoId : this.idEnderecoSelecionado,
      carrinho: produtosCarrinho,
      total: this.total,
      frete: this.frete,
      cupom: this.formCupom.value.cupom,
      status: 'EM PROCESSAMENTO',
      codCompra: Math.floor(Math.random() * 10000000),
      cartoes: [],
    };

    if (cartao1) {
      if (this.numeroCartaoSelecionado) {
        cartao1 = this.cliente.cartoes.find((cartao: any) => cartao.numeroCartao === cartao1);
      }
      let cartao: any = cartao1;
      cartao.valor = this.total;
      compra.cartoes.push(cartao as never);
    }
    if (cartao2) {
      const cartao: any = cartao2;
      compra.cartoes.push(cartao as never);
    }

    console.log(compra);

    try {
      fetch('http://localhost:3009/finalizarCompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(compra)
      }).then(response => {
        if (response.ok) {
          alert('Compra finalizada com sucesso!');
          localStorage.removeItem('cart');
          sessionStorage.removeItem('carrinhoImediato');
          location.href = '/';
        }
      })
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
    }

  }

  pagarComDoisCartoes(escolha: boolean) {
    if (escolha){
      this.adicionouCartao = true;
      const cartaoDiv = document.createElement('div');
      cartaoDiv.innerHTML = `
      <div class="doisCartoes">
        <div class="cartoesMultiplos">
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
          </div>
        </div>

        <div class="cartoesMultiplos">
          <p>Cartão de crédito 2</p>
          <class="blockForm"  style="display: flex; flex-direction: column; justify-content: start; align-items: start; align-content: center;">
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

  selecionarCartao(cartao: any){
    this.numeroCartaoSelecionado = cartao.target.value;
    console.log(this.numeroCartaoSelecionado);
  }

  selecionarEndereco(endereco: any){
    this.idEnderecoSelecionado = endereco.target.value;
  }
}
