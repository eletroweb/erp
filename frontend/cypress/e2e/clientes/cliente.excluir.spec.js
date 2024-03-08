describe('RF14 Excluir Cliente', () => {
  it('RF14 Excluir Cliente', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Clientes').click()
    cy.contains('Editar').click()
    cy.contains('Excluir').click()
    cy.contains('Confirmar').click()
    cy.contains('Excluir de cliente')
  })
})
