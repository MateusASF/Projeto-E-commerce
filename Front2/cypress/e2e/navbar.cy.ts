describe('template spec', () => {
  describe('navBar.cy.ts', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200');
    });

    it('deve navegar para a página de clientes', () => {
      cy.get('.navbar').contains('Clientes').click();
      cy.url().should('include', '/cliente');
    });

    it('deve navegar para a página de relógios', () => {
      cy.get('.navbar').contains('Relógios').click();
      cy.url().should('include', '/produtos');
    });

    it('deve manter na página inicial quando clicar em August', () => {
      cy.get('.navbar').contains('August').click();
      cy.url().should('eq', 'http://localhost:4200/');
    });

    it('deve navegar para a página de pedidos', () => {
      cy.get('.navbar').contains('Pedidos').click();
      cy.url().should('include', '/produtos/pedidos');
    });

    it('deve navegar para a página de vendas', () => {
      cy.get('.navbar').contains('Vendas').click();
      cy.url().should('include', '/produtos/vendas');
    });

    it('deve navegar para a página do carrinho', () => {
      cy.get('.navbar').find('a').contains('Carrinho').click();
      cy.url().should('include', '/produtos/carrinho');
    });  beforeEach(() => {
      cy.visit('http://localhost:4200');
    });

    it('deve navegar para a página de clientes', () => {
      cy.get('.navbar').contains('Clientes').click();
      cy.url().should('include', '/cliente');
    });

    it('deve navegar para a página de relógios', () => {
      cy.get('.navbar').contains('Relógios').click();
      cy.url().should('include', '/produtos');
    });

    it('deve manter na página inicial quando clicar em August', () => {
      cy.get('.navbar').contains('August').click();
      cy.url().should('eq', 'http://localhost:4200/');
    });

    it('deve navegar para a página de pedidos', () => {
      cy.get('.navbar').contains('Pedidos').click();
      cy.url().should('include', '/produtos/pedidos');
    });

    it('deve navegar para a página de vendas', () => {
      cy.get('.navbar').contains('Vendas').click();
      cy.url().should('include', '/produtos/vendas');
    });

    it('deve navegar para a página do carrinho', () => {
      cy.get('.navbar').find('a').contains('Carrinho').click();
      cy.url().should('include', '/produtos/carrinho');
    });
  })
})
