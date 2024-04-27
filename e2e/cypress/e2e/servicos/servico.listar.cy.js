describe('Servico', () => {
    it('RF8 Listar Serviço', () => {
      cy.visit('http://localhost:5173/')
      cy.contains('Serviços').click()
      cy.contains('Cadastrar')
    })
  })
  