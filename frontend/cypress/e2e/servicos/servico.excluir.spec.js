describe('Servico', () => {
  
    it('RF7 Excluir Serviço', () => {
      cy.visit('http://localhost:5173/')
      cy.contains('Serviços').click()
      cy.contains('Editar').click()
      cy.contains('Excluir').click()
      cy.contains('Confirmar').click()
      cy.contains('Serviço excluido com sucesso')
    })
  })
  