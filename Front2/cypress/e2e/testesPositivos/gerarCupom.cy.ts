describe('Gerar Cupom Test', () => {
  beforeEach(() => {
    cy.visit('/produtos/gerar-cupom'); // Substitua pelo caminho correto da sua aplicação
    cy.get('.containerGerarCupom').should('be.visible'); // Espera o container principal estar visível
  });

  it('should generate a coupon with value 20000 and a random code, without percentage', () => {
    // Gerar um código aleatório
    const codCupom = 'CUPOM' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Preencher o código e o valor do cupom
    cy.get('input[formControlName="codCupom"]').type(codCupom);
    cy.get('input[formControlName="valor"]').type('20000');

    // Deixar o campo porcentagem vazio
    cy.get('input[formControlName="porcentagem"]').should('have.value', '');

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Espera explícita para a navegação ocorrer
    cy.wait(2000); // Ajuste o tempo de espera conforme necessário

    // Verificar se a navegação foi para a página de listagem de cupons
    cy.url().should('include', '/produtos/listar-cupons');
  });

  it('should generate a coupon with a percentage and a random code, without value', () => {
    // Gerar um código aleatório
    const codCupom = 'CUPOM' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Preencher o código e a porcentagem do cupom
    cy.get('input[formControlName="codCupom"]').type(codCupom);
    cy.get('input[formControlName="porcentagem"]').type('10'); // Exemplo de porcentagem

    // Deixar o campo valor vazio
    cy.get('input[formControlName="valor"]').should('have.value', '');

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Espera explícita para a navegação ocorrer
    cy.wait(2000); // Ajuste o tempo de espera conforme necessário

    // Verificar se a navegação foi para a página de listagem de cupons
    cy.url().should('include', '/produtos/listar-cupons');
  });
});
