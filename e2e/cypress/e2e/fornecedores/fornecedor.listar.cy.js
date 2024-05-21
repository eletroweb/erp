describe('Listar Fornecedor', () => {

    beforeEach(() => {
      cy.fixture('login.json').then((login) => {
        cy.visit('http://localhost:5173/');
        cy.get('input[type="email"]').type(login.email)
        cy.get('input[type="password"]').type(login.password)
        cy.contains('Entrar').click();
      })
    })
  
    it('RF13.4 Listar Fornecedor', () => {
      cy.contains('Fornecedores').click()
    })
})