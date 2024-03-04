describe('Cliente', () => {
  it('RF2.15 Listar Cliente', () => {
    cy.visit('http://localhost:5173/')
    cy.contains('Clientes').click()
    cy.contains('Cadastrar')
  })
})
