describe('Jornada do Produto ao Checkout', () => {
  it('seleciona um produto, adiciona ao carrinho, faz login e chega na página de checkout', () => {
    // Visita a página de produtos
    cy.visit('http://localhost:4200/produtos');

    // Escolhe um produto (aqui estamos escolhendo o primeiro produto listado)
    // Você pode precisar ajustar o seletor conforme sua estrutura HTML
    cy.get('.card').first().click();

    cy.url().should('include', 'http://localhost:4200/produtos/info');

    // Na página do produto, seleciona duas unidades
    // Isso também depende da sua estrutura HTML, você pode precisar ajustar o seletor
    cy.get('input[type="number"]').type('2');

    // Clica no botão de adicionar ao carrinho
    cy.get('#addToCart').click();

    // // Supondo que o botão de adicionar ao carrinho redireciona para a página do carrinho
    // // Verifica se a URL mudou para a página do carrinho
    // cy.url().should('include', '/carrinho');

    // // Na página do carrinho, clica no botão de prosseguir para a compra
    // cy.get('button.prosseguir-compra').click();

    // // Verifica se é redirecionado para a página de login (caso não esteja logado)
    // cy.url().should('include', '/login');

    // // Realiza o login
    // cy.get('input[type="email"]').type('admin@example.com');
    // cy.get('input[type="password"]').type('admin123');
    // cy.get('button[type="submit"]').click();

    // // Verifica se após o login é redirecionado para a página de checkout
    // cy.url().should('include', '/checkout');

    // // Aqui, você pode adicionar mais verificações, como a presença de elementos específicos na página de checkout
    // // Exemplo:
    // // cy.get('.resumo-pedido').should('be.visible');
  });
});
