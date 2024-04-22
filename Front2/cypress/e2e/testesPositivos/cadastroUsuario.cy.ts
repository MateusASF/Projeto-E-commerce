

describe('template spec', () => {
  it('deve preencher e submeter o formulário de cadastro com sucesso', () => {
    cy.visit('/cliente');
    const cpfAleatorio = () => {
      const rand = (min :number , max : number) => Math.floor(Math.random() * (max - min) + min);
      const n1 = rand(10, 99);
      const n2 = rand(10, 99);
      const n3 = rand(10, 99);
      const d1 = rand(10, 99);
      return `${n1}${n2}${n3}${d1}`;
    };
    cy.get('#nome').type('Bruno');
    cy.get('#nascimento').type('2024-02-01');
    cy.get('input[type="radio"][value="masculino"]').check();
    cy.get('#cpf').type('5611716517');
    cy.get('#telefone').type('40028922');
    cy.get('input[type="radio"][value="celular"]').check();
    cy.get('#senha').type('Teste123');
    cy.get('#confirmarSenha').type('Teste123');
    cy.get('#email').type('appdomate@gmail.com');
    cy.get('button').contains('Adicionar Endereço').click();
    cy.get('.blockForm').last().within(() => {
      cy.get('input[id="logradouro"]').type('Japão');
      cy.get('input[value="avenida"]').check();
      cy.get('input[id="numero"]').type('828');
      cy.get('input[id="bairro"]').type('Alto do Ipiranga');
      cy.get('input[id="cidade"]').type('Mogi das Cruzes');
      cy.get('input[id="estado"]').type('São Paulo');
      cy.get('input[id="pais"]').type('Brasil');
      cy.get('input[id="cep"]').type('08730-330');
      cy.get('input[value="Casa"]').check();
      cy.get('input[id="identificacao"]').type('A casa que moro');
    });
    cy.get('button').contains('Adicionar Cartão').click();
    cy.get('.blockForm').last().within(() => {
      cy.get('#numeroCartao').type(cpfAleatorio());
      cy.get('#nomeCartao').type('Augustinho');
      cy.get('#bandeira').select('Visa');
      cy.get('#cvv').type('856');
    });
    cy.get('form').submit();
  });
})
