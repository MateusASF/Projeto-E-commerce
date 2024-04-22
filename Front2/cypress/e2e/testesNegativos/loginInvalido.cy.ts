describe('template spec', () => {
  it('deve efetuar login com credenciais inválidas', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('addsadsadsaasin@example.com');
    cy.get('input[type="password"]').type('adfsdaf');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuário ou senha inválidos');
    });
  });
})
