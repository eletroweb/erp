/*describe('Cliente', () => {
  it('RF2.15 Listar Cliente', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Clientes').click()
    cy.contains('Cadastrar')
  })
})*/

describe('Validar listar cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.4 Listar Clientes', () => {
    cy.contains('Clientes').click()
  })
})