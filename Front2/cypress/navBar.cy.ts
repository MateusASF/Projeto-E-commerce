describe('navBar.cy.ts', () => {
  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('http://localhost:4200');
  });

  it('deve navegar para a página de clientes', () => {
    // Clica no link "Clientes" e verifica se a URL está correta
    cy.get('.navbar').contains('Clientes').click();
    cy.url().should('include', '/cliente');
  });

  it('deve navegar para a página de relógios', () => {
    // Clica no link "Relógios" e verifica se a URL está correta
    cy.get('.navbar').contains('Relógios').click();
    cy.url().should('include', '/produtos');
  });

  it('deve manter na página inicial quando clicar em August', () => {
    // Clica no link "August" e verifica se a URL não mudou
    cy.get('.navbar').contains('August').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('deve navegar para a página de pedidos', () => {
    // Clica no link "Pedidos" e verifica se a URL está correta
    cy.get('.navbar').contains('Pedidos').click();
    cy.url().should('include', '/produtos/pedidos');
  });

  it('deve navegar para a página de vendas', () => {
    // Clica no link "Vendas" e verifica se a URL está correta
    cy.get('.navbar').contains('Vendas').click();
    cy.url().should('include', '/produtos/vendas');
  });

  it('deve navegar para a página do carrinho', () => {
    // Clica no ícone do carrinho e verifica se a URL está correta
    cy.get('.navbar').find('a').contains('⏲').click();
    cy.url().should('include', '/produtos/carrinho');
  });  beforeEach(() => {
    // Visita a página inicial antes de cada teste
    cy.visit('http://localhost:4200');
  });

  it('deve navegar para a página de clientes', () => {
    // Clica no link "Clientes" e verifica se a URL está correta
    cy.get('.navbar').contains('Clientes').click();
    cy.url().should('include', '/cliente');
  });

  it('deve navegar para a página de relógios', () => {
    // Clica no link "Relógios" e verifica se a URL está correta
    cy.get('.navbar').contains('Relógios').click();
    cy.url().should('include', '/produtos');
  });

  it('deve manter na página inicial quando clicar em August', () => {
    // Clica no link "August" e verifica se a URL não mudou
    cy.get('.navbar').contains('August').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('deve navegar para a página de pedidos', () => {
    // Clica no link "Pedidos" e verifica se a URL está correta
    cy.get('.navbar').contains('Pedidos').click();
    cy.url().should('include', '/produtos/pedidos');
  });

  it('deve navegar para a página de vendas', () => {
    // Clica no link "Vendas" e verifica se a URL está correta
    cy.get('.navbar').contains('Vendas').click();
    cy.url().should('include', '/produtos/vendas');
  });

  it('deve navegar para a página do carrinho', () => {
    // Clica no ícone do carrinho e verifica se a URL está correta
    cy.get('.navbar').find('a').contains('⏲').click();
    cy.url().should('include', '/produtos/carrinho');
  });
})
