describe('Dropdown Menu Test', () => {
  beforeEach(() => {
    cy.visit('/'); // Substitua pelo caminho correto da sua aplicação
  });

  it('should navigate to login page when clicking on admin icon', () => {
    cy.get('.dropdown-item a[routerLink="/login"] img').click();
    cy.url().should('include', '/login');
  });

  it('should display dropdown content when hovering over Clientes', () => {
    cy.get('.dropdown-item:contains("Clientes") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Clientes") .dropdown-content').should('be.visible');
    cy.get('.dropdown-item:contains("Clientes") .dropdown-content a[routerLink="/cliente"]').should('have.text', 'Cadastrar Cliente');
    cy.get('.dropdown-item:contains("Clientes") .dropdown-content a[routerLink="/cliente/listar"]').should('have.text', 'Listar Clientes');
  });

  it('should navigate to produtos page when hovering over Relógios and clicking on Ver produtos', () => {
    cy.get('.dropdown-item:contains("Relógios") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Relógios") .dropdown-content a[routerLink="/produtos"]').click();
    cy.url().should('include', '/produtos');
  });

  it('should navigate to Troca / Devolução page when hovering over Pedidos and clicking on Troca / Devolução', () => {
    cy.get('.dropdown-item:contains("Pedidos") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Pedidos") .dropdown-content a[routerLink="/produtos/troca/devolucao"]').click();
    cy.url().should('include', '/produtos/troca/devolucao');
  });

  it('should navigate to Status pedido page when hovering over Pedidos and clicking on Status pedido', () => {
    cy.get('.dropdown-item:contains("Pedidos") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Pedidos") .dropdown-content a[routerLink="/produtos/status-pedido"]').click();
    cy.url().should('include', '/produtos/status-pedido');
  });

  it('should navigate to Cadastrar Cliente page when hovering over Clientes and clicking on Cadastrar Cliente', () => {
    cy.get('.dropdown-item:contains("Clientes") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Clientes") .dropdown-content a[routerLink="/cliente"]').click();
    cy.url().should('include', '/cliente');
  });

  it('should navigate to Listar Clientes page when hovering over Clientes and clicking on Listar Clientes', () => {
    cy.get('.dropdown-item:contains("Clientes") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Clientes") .dropdown-content a[routerLink="/cliente/listar"]').click();
    cy.url().should('include', '/cliente/listar');
  });

  it('should navigate to cart page when clicking on cart icon', () => {
    cy.get('.dropdown-item a[routerLink="/produtos/carrinho"] img').click();
    cy.url().should('include', '/produtos/carrinho');
  });

  it('should navigate to Gerar Cupom page when hovering over Cupons and clicking on Gerar Cupom', () => {
    cy.get('.dropdown-item:contains("Cupons") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Cupons") .dropdown-content a[routerLink="/produtos/gerar-cupom"]').click();
    cy.url().should('include', '/produtos/gerar-cupom');
  });

  it('should navigate to Listar Cupons page when hovering over Cupons and clicking on Listar Cupons', () => {
    cy.get('.dropdown-item:contains("Cupons") > a').realHover(); // Usando realHover para simular hover real
    cy.get('.dropdown-item:contains("Cupons") .dropdown-content a[routerLink="/produtos/listar-cupons"]').click();
    cy.url().should('include', '/produtos/listar-cupons');
  });
});
