import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/serviceMail/email.service';

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
  cuponsUsados: any = [];
  qtdCartoes = 1;
  compra: any = {};

  formCupom!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private renderer: Renderer2,
    private emailService: EmailService) {} 

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
  }

  calcularFrete() {
    this.frete = Math.floor(Math.random() * (78 - 15 + 1)) + 15;
    this.total += this.frete;
  }

  inserirCupom() {
    let cupom = this.formCupom.value.cupom;
    try {
      fetch(`http://localhost:3009/validarCupom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cupom: cupom})
      }).then(async response => {
        if (response.ok) {
          let data = await response.json();
          data = data[0];

          if (data.status == 'USADO') {
            alert('Cupom já utilizado!');
          } else {
            const cupomUsado = await this.cuponsUsados.find((cupom: any) => cupom.codCupom == data.codCupom);
            const cupomDesconto = await this.cuponsUsados.find((cupom: any) => cupom.tipo == 'DESCONTO');
            if (data.tipo == 'TROCA' && cupomUsado == undefined) {
              this.cuponsUsados.push(data);
              let desconto = 0;
              if (data.porcentagem) {
                desconto = this.total * (data.porcentagem / 100);
              } else {
                desconto = data.valor;
              }
              this.calcularTotalDesconto(desconto);
            } else if (data.tipo == 'DESCONTO' && cupomUsado == undefined && cupomDesconto == undefined) {
              this.cuponsUsados.push(data);
              let desconto = 0;
              if (data.porcentagem) {
                desconto = this.total * (data.porcentagem / 100);
              } else {
                desconto = data.valor;
              }
              this.calcularTotalDesconto(desconto);
            } else if (cupomUsado != undefined) {
              alert('Cupom já utilizado!');
            } else if (data.tipo == 'DESCONTO' && cupomDesconto.tipo == 'DESCONTO') {
              alert('Somente um cupom de desconto pode ser utilizado por compra!');
            } else {
              alert('Cupom inválido!');
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
    }
  }

  calcularTotalDesconto(desconto: number) {
    this.total -= desconto;
  }

  limparCupom() {
    this.cuponsUsados = [].slice();
    this.total = this.carrinho.reduce((acc: number, item: any) => acc + item.product.preco * item.quantity, 0);
    (document.querySelector('input[name="cupom"]') as HTMLInputElement).value = '';
  }

  async finalizarCompra() {
    try {
      var adicionarEndereco = (document.querySelector('input[name="opcao"]:checked')  as HTMLInputElement)?.value
      if (adicionarEndereco == "Sim") {
        this.adicionouEndereco = true;
      }
      // console.log(adicionarEndereco);
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
      
      let enderecoId = 0;
  
      if (adicionarEndereco == "Sim") {;
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
      // console.log(enderecoId);
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
        cupons: this.cuponsUsados,
        status: 'EM PROCESSAMENTO',
        codCompra: Math.floor(Math.random() * 10000000),
        cartoes: [],
      };
      let totalCartoes = 0;
      const cartoes = document.querySelectorAll('.cartoesPagamento');
      for (let i = 0; i < cartoes.length; i++) {
        let cartao = cartoes[i];
        let numeroCartao = (cartao.querySelector('input[name="numeroCartao"]') as HTMLInputElement)?.value;
        let nomeCartao = (cartao.querySelector('input[name="nomeCartao"]') as HTMLInputElement)?.value;
        let bandeira = (cartao.querySelector('select[name="bandeira"]') as HTMLSelectElement)?.value;
        let cvv = (cartao.querySelector('input[name="cvv"]') as HTMLInputElement)?.value;
        let valor = (cartao.querySelector('input[name="valor"]') as HTMLInputElement)?.value;
        let valor2 = (cartao.querySelector(`input[name="valor${i+1}"]`) as HTMLInputElement)?.value;
        let adicionarPerfil = (cartao.querySelector('input[name="adicionarCartao"]') as HTMLInputElement)?.value && (cartao.querySelector('input[name="adicionarCartao"]') as HTMLInputElement)?.checked || false;
        let adicionarPerfil2 = (cartao.querySelector(`input[name="opcaoCard${i+1}"]`) as HTMLInputElement)?.value && (cartao.querySelector(`input[name="opcaoCard${i+1}"]`) as HTMLInputElement)?.checked;
  
        let cartaoObj: any = {
          numeroCartao: numeroCartao,
          nomeCliente: nomeCartao,
          bandeira: bandeira,
          cvv: cvv,
          valor: valor || valor2 || this.total,
          adicionarPerfil: adicionarPerfil || adicionarPerfil2 || false,
        };
        let valorOk = this.validarValor(Number(cartaoObj.valor));
        if (!valorOk) break;
        (compra.cartoes as any[]).push(cartaoObj);
        totalCartoes += Number(cartaoObj.valor);
      }

        this.validarTotalCompra(totalCartoes)

  
      compra.cartoes.forEach((cartao: any) => {
        if (cartao.adicionarPerfil == 'Sim') {
          try {
            fetch('http://localhost:3009/adicionarCartao', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idCliente: this.cliente.id,
                numeroCartao: cartao.numeroCartao,
                nomeCliente: cartao.nomeCliente,
                bandeira: cartao.bandeira,
                cvv: cartao.cvv
              })
            }).then(response => {
              if (response.ok) {
                console.log('Cartão adicionado com sucesso!');
              }
            });
          } catch (error) {
            console.error('Erro ao adicionar cartão:', error);
          }
        }
      });
  
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

      this.compra = compra;

    } catch (error) {
      alert(error);
    }
  }


  validarValor(value: number) {
    if (value < 10 && this.total > 10) {
      throw new Error("O valor em cada cartão não pode ser menos de R$10,00");
    }
    return true;
  }

  validarTotalCompra(value: number) {
    if (value < this.total) {
      throw new Error("O valor nos cartões não pode ser menor que o valor total da compra");
    } else if (value > this.total) {
      throw new Error("O valor nos cartões não pode ser maior que o valor total da compra");
    } else if (value == 0) {
      throw new Error("O valor nos cartões não pode ser R$0,00");
    }
    return true;
  }

  selecionarCartao(cartao: any){
    this.numeroCartaoSelecionado = cartao.target.value;
    for (let i = 0; i < this.cliente.cartoes.length; i++) {
      if (this.cliente.cartoes[i].numeroCartao == this.numeroCartaoSelecionado) {
        (document.querySelector('input[name="numeroCartao"]') as HTMLInputElement).value = this.cliente.cartoes[i].numeroCartao;
        (document.querySelector('input[name="nomeCartao"]') as HTMLInputElement).value = this.cliente.cartoes[i].nomeCliente;
        (document.querySelector('select[name="bandeira"]') as HTMLSelectElement).value = this.cliente.cartoes[i].bandeira.toLowerCase();
        (document.querySelector('input[name="cvv"]') as HTMLInputElement).value = this.cliente.cartoes[i].cvv;
        let seleciona = document.querySelectorAll('.adicionarCartao') as any;
        console.log(seleciona);
        break;
      } else {
        (document.querySelector('input[name="numeroCartao"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="nomeCartao"]') as HTMLInputElement).value = '';
        (document.querySelector('select[name="bandeira"]') as HTMLSelectElement).value = '';
        (document.querySelector('input[name="cvv"]') as HTMLInputElement).value = '';
      }
    }
  }

  selecionarCartao2(event: any, indice: number) {
    const numeroCartao = event.target.value;
    const cartao = this.cliente.cartoes.find((c: { numeroCartao: any; }) => c.numeroCartao === numeroCartao);

    if (cartao) {
      const numeroInput = document.getElementById(`numeroCartao${indice}`) as HTMLInputElement;
      const nomeInput = document.getElementById(`nomeCartao${indice}`) as HTMLInputElement;
      const bandeiraSelect = document.getElementById(`bandeira${indice}`) as HTMLSelectElement;
      const cvvInput = document.getElementById(`cvv${indice}`) as HTMLInputElement;
      const valorInput = document.getElementById(`valor${indice}`) as HTMLInputElement;

      numeroInput ? numeroInput.value = cartao.numeroCartao : '';
      nomeInput ? nomeInput.value = cartao.nomeCliente : '';
      bandeiraSelect ? bandeiraSelect.value = cartao.bandeira.toLowerCase() : '';
      cvvInput ? cvvInput.value = cartao.cvv : '';
    } else {
      (document.getElementById(`numeroCartao${indice}`) as HTMLInputElement).value = '';
      (document.getElementById(`nomeCartao${indice}`) as HTMLInputElement).value = '';
      (document.getElementById(`bandeira${indice}`) as HTMLSelectElement).value = '';
      (document.getElementById(`cvv${indice}`) as HTMLInputElement).value = '';
    }
  }

  selecionarEndereco(endereco: any){
    this.idEnderecoSelecionado = endereco.target.value;
    for (let i = 0; i < this.enderecosEntrega.length; i++) {
      if (this.enderecosEntrega[i].id == this.idEnderecoSelecionado) {
        this.calcularFrete();
        (document.querySelector('input[name="logradouro"]') as HTMLInputElement).value = this.enderecosEntrega[i].logradouro;
        (document.querySelector('input[name="tipoLogradouro"]') as HTMLInputElement).value = this.enderecosEntrega[i].tipoLogradouro;
        (document.querySelector('input[name="numero"]') as HTMLInputElement).value = this.enderecosEntrega[i].numero;
        (document.querySelector('input[name="bairro"]') as HTMLInputElement).value = this.enderecosEntrega[i].bairro;
        (document.querySelector('input[name="cidade"]') as HTMLInputElement).value = this.enderecosEntrega[i].cidade;
        (document.querySelector('input[name="estado"]') as HTMLInputElement).value = this.enderecosEntrega[i].estado;
        (document.querySelector('input[name="pais"]') as HTMLInputElement).value = this.enderecosEntrega[i].pais;
        (document.querySelector('input[name="cep"]') as HTMLInputElement).value = this.enderecosEntrega[i].cep;
        (document.querySelector('input[name="tipoResidencia"]') as HTMLInputElement).value = this.enderecosEntrega[i].tipoResidencia;
        (document.querySelector('input[name="observacoes"]') as HTMLInputElement).value = this.enderecosEntrega[i].observacoes;
        (document.querySelector('input[name="identificacao"]') as HTMLInputElement).value = this.enderecosEntrega[i].identificacao;
        break;
      } else {
        (document.querySelector('input[name="logradouro"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="tipoLogradouro"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="numero"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="bairro"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="cidade"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="estado"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="pais"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="cep"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="tipoResidencia"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="observacoes"]') as HTMLInputElement).value = '';
        (document.querySelector('input[name="identificacao"]') as HTMLInputElement).value = '';
        this.frete = 0;
      }
    }
  }

  atualizarNumeroCartoes(numero: number) {
    this.qtdCartoes = numero;
    const container = document.getElementById('cartoes-adicionais');
    if (container) {
      this.renderer.setProperty(container, 'innerHTML', '');
      for (let i = 1; i < numero; i++) {
        const cartaoElement = this.renderer.createElement('div');
        cartaoElement.innerHTML = this.gerarCamposCartao(i + 1);
        this.renderer.appendChild(container, cartaoElement);

        // Adiciona o listener para o evento change do select
        const selectElement = cartaoElement.querySelector('select');
        if (selectElement) {
          this.renderer.listen(selectElement, 'change', (event) => this.selecionarCartao2(event, i + 1));
        }
      }
    }
  }

  gerarCamposCartao(indice: number): string {
    return `
      <div class="cartoesPagamento" style="  display: flex;
      justify-content: start;
      align-items: start;
      align-content: start;
      flex-direction: column;">
        <p>Cartão de crédito ${indice}</p>
        <select onchange="angular.element(this).scope().component.selecionarCartao(event, ${indice})" style="margin-bottom: 6px;">
          <option value="selecionarCartao">Selecionar Cartão</option>
          ${this.cliente.cartoes.map((cartao: { numeroCartao: any; }) => `<option value="${cartao.numeroCartao}">${cartao.numeroCartao}</option>`).join('')}
          </select>
        <div class="blockForm" style="  display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: start; margin: 0; padding: 0;">
          <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px;">
            <label for="numeroCartao${indice}" style="color: var(--secondary-color);">Número</label>
            <input type="text" id="numeroCartao${indice}" name="numeroCartao" style="  color: var(--secondary-color);
            font-family: var(--font-primary);
            background-color: var(--primary-color);
            border: none;
            border: 1px solid var(--secondary-color);
            border-radius: 5px;
            padding: 5px 1.5px;">
          </div>
          <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px;">
            <label for="nomeCartao${indice}" style="color: var(--secondary-color);">Nome</label>
            <input type="text" id="nomeCartao${indice}" name="nomeCartao" style="  color: var(--secondary-color);
            font-family: var(--font-primary);
            background-color: var(--primary-color);
            border: none;
            border: 1px solid var(--secondary-color);
            border-radius: 5px;
            padding: 5px 1.5px;">
          </div>
          <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px;">
            <label for="bandeira${indice}" style="color: var(--secondary-color);">Bandeira</label>
            <select id="bandeira${indice}" name="bandeira">
              <option value="selecionarBanceira">Selecionar Bandeira</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
              <option value="discover">Discover</option>
            </select>
          </div>
        </div>
        <div class="blockForm" style="  display: flex; flex-direction: row; justify-content: start; align-items: start; align-content: start; margin: 0; padding: 0;">
          <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px;">
            <label for="cvv${indice}" style="color: var(--secondary-color);">CVV</label>
            <input type="text" id="cvv${indice}" name="cvv" style="  color: var(--secondary-color);
            font-family: var(--font-primary);
            background-color: var(--primary-color);
            border: none;
            border: 1px solid var(--secondary-color);
            border-radius: 5px;
            padding: 5px 1.5px;">
          </div>
          <div class="form-group" style="display:flex; justify-content: space-between; flex-direction: column; margin: 2px;">
            <label for="valor${indice}" style="color: var(--secondary-color);">Valor</label>
            <input type="text" id="valor${indice}" id="valor" style="  color: var(--secondary-color);
            font-family: var(--font-primary);
            background-color: var(--primary-color);
            border: none;
            border: 1px solid var(--secondary-color);
            border-radius: 5px;
            padding: 5px 1.5px;" name="valor${indice}">
          </div>
          <div class="form-group-ch adicionarCartao" style="display:flex; justify-content: space-between; flex-direction: column; margin: 7px;">
            <label for="adicionarPerfil${indice}" style="color: var(--secondary-color);">Adicionar ao Perfil:</label>
            <div style="display: flex; flex-direction: row;">
              <label>Sim</label>
              <input type="radio" name="opcaoCard${indice}" value="Sim">
              <label>Não</label>
              <input type="radio" name="opcaoCard${indice}" value="Não" checked>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  sendEmail() {
    this.emailService.sendEmailCompra(this.compra).then(
      (response) => {
        console.log('E-mail enviado com sucesso', response.status, response.text);
      },
      (error) => {
        console.error('Erro ao enviar o e-mail', error);
      }
    );
  }
}
