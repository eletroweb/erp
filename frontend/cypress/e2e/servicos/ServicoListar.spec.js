describe('Servico', () => {
    it('Listar Servicos', () => {
      cy.visit('http://localhost:5173/')
      cy.contains('Serviços').click()
      cy.contains('Cadastrar')
    })
  })
  