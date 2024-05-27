describe('template spec', () => {
  describe('Jornada do Produto ao Checkout', () => {
    it('seleciona um produto, adiciona ao carrinho, faz login e chega na página de checkout', () => {
      cy.visit('/produtos');
      cy.get('.card').first().click();
      cy.url().should('include', '/produtos/info');
      cy.get('input[type="number"]').type('0');
      cy.get('#addToCart').click();
      cy.visit('/produtos/carrinho');
      cy.url().should('include', '/produtos/carrinho');
      cy.get('.botaoFinalizarCompra').click();
      cy.url().should('include', '/login');
      cy.get('input[type="email"]').type('maria@gmail.com');
      cy.get('input[type="password"]').type('Teste123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/produtos/finalizar-compra');
      
      // Selecionar um endereço existente
      cy.get('.select-endereco').eq(0).select('1');
      
      // Escolher a opção de pagamento com um cartão
      cy.get('input[name="opcaoCartao"][value="umCartao"]').check();
      cy.get('.cartoesPagamento > [style="margin-bottom: 6px;"]').eq(0).select('987659876532');
      // Inserir o cupom TIRA5000
      cy.get('input[formControlName="cupom"]').type('TIRA5000');
      cy.get('button').contains('Aplicar Cupom').click();
      
      // Verificar se o cupom foi aplicado corretamente
      cy.get('.cuponsUsados').should('contain', 'TIRA5000');
      
      // Finalizar compra
      cy.get('button').contains('Finalizar Compra').click();

      // Verificar se a compra foi finalizada com sucesso (dependendo da sua aplicação, ajuste a verificação)
      cy.url().should('include', 'http://localhost:4200/');
    });
  });
});
