describe('Cliente', () => {
  it('Listar Clientes', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Clientes').click()
    cy.contains('Cadastrar')
  })
})
