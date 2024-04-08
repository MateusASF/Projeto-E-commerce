import { Component } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  clientes: any[] = [];
  nome: string = '';
  email: string = '';
  nascimento: string = '';
  genero: string = '';
  cpf: string = '';

  telefone: {
    numeroTelefone: string;
    tipoTelefone: string;
  } = {
    numeroTelefone: '',
    tipoTelefone: ''
  };

  endereco: {
    logradouro: string;
    tipoLogradouro: string;
    numero: number | string; // Pode ser string se você esperar entradas como 'S/N'
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: string;
    tipoResidencia: string;
    observacoes: string;
    identificacao: string;
    tipoEndereco: string;
  } = {
    logradouro: '',
    tipoLogradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    tipoResidencia: '',
    observacoes: '',
    identificacao: '',
    tipoEndereco: ''
  };

  cartao: {
    numeroCartao: string;
    nomeCliente: string;
    bandeira: string;
    cvv: number | string; // Pode ser string para evitar problemas com números iniciando com 0
  } = {
    numeroCartao: '',
    nomeCliente: '',
    bandeira: '',
    cvv: ''
  };


  ngOnInit() {
    try {
      fetch('http://localhost:3009/listar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        this.clientes = data;
        // Handle the response data here
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error here
    }
  }

  inativarCliente(id: number) {
    if (confirm('Tem certeza que deseja inativar este usuário?')) {
      try {
        fetch(`http://localhost:3009/inativar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente inativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
        // Handle the error here
      }
    }
  }

    ativarCliente(id: number) {
    if (confirm('Tem certeza que deseja ativar este usuário?')) {
      try {
        fetch(`http://localhost:3009/ativar`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente ativado:', data);
          location.reload();
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  filtrarClientes() {
    let filtro: any = {};

    // Campos básicos
    if (this.cpf.trim() !== '') {
      filtro.cpf = this.cpf.trim();
    }
    if (this.nome.trim() !== '') {
      filtro.nome = this.nome.trim();
    }
    if (this.email.trim() !== '') {
      filtro.email = this.email.trim();
    }
    if (this.nascimento.trim() !== '') {
      filtro.nascimento = this.nascimento.trim();
    }
    if (this.genero.trim() !== '') {
      filtro.genero = this.genero.trim();
    }

    // Telefone
    if (this.telefone.numeroTelefone.trim() !== '' || this.telefone.tipoTelefone.trim() !== '') {
      filtro.telefones = [{
        numeroTelefone: this.telefone.numeroTelefone.trim(),
        tipoTelefone: this.telefone.tipoTelefone.trim() // Supondo que este campo sempre terá um valor selecionado
      }];
    }

    // Endereço
    if (this.endereco.logradouro.trim() !== '' || this.endereco.numero !== '' || this.endereco.tipoLogradouro.trim() !== '' ||
    this.endereco.bairro.trim() !== '' || this.endereco.cidade.trim() !== '' || this.endereco.estado.trim() !== '' || this.endereco.pais.trim() !== '' ||
    this.endereco.cep.trim() !== '' || this.endereco.tipoResidencia.trim() !== '' || this.endereco.observacoes.trim() !== '' ||
    this.endereco.identificacao.trim() !== '' || this.endereco.tipoEndereco.trim() !== '') {
      filtro.enderecos = [{
        logradouro: this.endereco.logradouro.toString().trim(),
        numero: this.endereco.numero.toString().trim(),
        tipoLogradouro: this.endereco.tipoLogradouro.toString().trim(),
        bairro: this.endereco.bairro.toString().trim(),
        cidade: this.endereco.cidade.toString().trim(),
        estado: this.endereco.estado.toString().trim(),
        pais: this.endereco.pais.toString().trim(),
        cep: this.endereco.cep.toString().trim(),
        tipoResidencia: this.endereco.tipoResidencia.toString().trim(),
        observacoes: this.endereco.observacoes.toString().trim(),
        identificacao: this.endereco.identificacao.toString().trim(),
        tipoEndereco: this.endereco.tipoEndereco.toString().trim()
      }];
    }

    // Cartão
    if (this.cartao.numeroCartao.trim() !== '') {
      filtro.cartoes = [{
        cvv: this.cartao.cvv.toString().trim(), // Garantindo que cvv seja tratado como string
        bandeira: this.cartao.bandeira.toString().trim(),
        nomeCliente: this.cartao.nomeCliente.toString().trim(),
        numeroCartao: this.cartao.numeroCartao.toString().trim()
      }];
    }

    fetch('http://localhost:3009/filtrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filtro)
    })
    .then(response => response.json())
    .then(data => {
      this.clientes = data;
    })
    .catch(error => console.error('Erro ao filtrar clientes:', error));
  }


  detalheCliente (cliente: any) {
    localStorage.setItem('cliente', JSON.stringify(cliente));
    location.href = '/cliente/detalhe';
  }

  trocarSenha (id: number, senha: any) {
    sessionStorage.setItem('cliente', JSON.stringify({ id: id, senha: senha }));
    location.href = '/cliente/trocar-senha';
  }
}
