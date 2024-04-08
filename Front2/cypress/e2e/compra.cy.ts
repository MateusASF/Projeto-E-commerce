describe('template spec', () => {
  describe('Jornada do Produto ao Checkout', () => {
    it('seleciona um produto, adiciona ao carrinho, faz login e chega na página de checkout', () => {
      cy.visit('/produtos');

      cy.get('.card').first().click();

      cy.url().should('include', '/produtos/info');

      cy.get('input[type="number"]').type('0');

      cy.get('#addToCart').click();

      cy.get('.navbar').find('a').contains('Carrinho').click();

      cy.url().should('include', '/produtos/carrinho');

      cy.get('.botaoFinalizarCompra').click();

      cy.url().should('include', '/login');

      cy.get('input[type="email"]').type('appdomate@gmail.com');
      cy.get('input[type="password"]').type('Teste123');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/produtos/finalizar-compra');


    });
  });
})
