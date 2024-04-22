describe('template spec', () => {
  describe('Jornada do Produto ao Checkout', () => {
    it('seleciona um usuário e edita seus campos', () => {
      const cpfAleatorio = () => {
        const rand = (min :number , max : number) => Math.floor(Math.random() * (max - min) + min);
        const n1 = rand(10, 99);
        const n2 = rand(10, 99);
        const n3 = rand(10, 99);
        const d1 = rand(10, 99);
        return `${n1}${n2}${n3}${d1}`;
      };
      cy.visit('/cliente/listar');
      cy.get('.clientesList').contains('Detalhes').click();
      cy.url().should('include', '/cliente/detalhe');
      cy.get('#dadosPessoais').click();
      cy.url().should('include', '/cliente/alterarUsuario');
      cy.get('#nome').clear().type('Cesar Filho');
      cy.get('#nascimento').clear().type('2024-02-01');
      cy.get('input[type="radio"][value="masculino"]').check();
      cy.get('#cpf').clear().type(cpfAleatorio());
      cy.get('#telefone').clear().type('40028922');
      cy.get('input[type="radio"][value="celular"]').check();
      cy.get('#email').clear().type('apppdomate@gmail.com');
      cy.get('form').submit();
      cy.url().should('include', '/cliente/listar');
      //endereço
      cy.get('.clientesList').contains('Detalhes').click();
      cy.url().should('include', '/cliente/detalhe');
      cy.get('#enderecoId').first().contains('Editar Endereço').click();
      cy.url().should('include', '/cliente/alterarEndereco');
      cy.get('input[id="logradouro"]').clear().type('India');
      cy.get('input[value="avenida"]').check();
      cy.get('input[id="numero"]').clear().type('828');
      cy.get('input[id="bairro"]').clear().type('Alto do Ipiranga');
      cy.get('input[id="cidade"]').clear().type('Mogi das Cruzes');
      cy.get('input[id="estado"]').clear().type('São Paulo');
      cy.get('input[id="pais"]').clear().type('Brasil');
      cy.get('input[id="cep"]').clear().type('08730-330');
      cy.get('input[value="Casa"]').check();
      cy.get('input[id="identificacao"]').clear().type('A casa que moro');
      cy.get('form').submit();
      cy.url().should('include', '/cliente/listar');
      cy.get('.clientesList').contains('Detalhes').click();
      cy.url().should('include', '/cliente/detalhe');
      cy.get('#cartaoId').first().contains('Editar Cartão').click();
      cy.url().should('include', '/cliente/alterarCartao');
      cy.get('#numeroCartao').type(cpfAleatorio());
      cy.get('#nomeCartao').type('Augustinho');
      cy.get('#bandeira').select('Visa');
      cy.get('#cvv').type('856');
      cy.get('form').submit();
      cy.url().should('include', '/cliente/listar');
      cy.get('.clientesList').contains('Detalhes').click();
      cy.url().should('include', '/cliente/detalhe');
    });
  });
});
