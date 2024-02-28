describe('Servico', () => {
    it('Cadastrar serviço', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Serviços').click()
        cy.contains('Cadastrar')
      cy.get('.btnCadastrar').click()
      cy.get('input[name="descricao"').type('Pintura')
      cy.get('input[name="valor"').type('3400')  
      cy.contains("Situação").click()
      cy.contains("Salvar").click()
      cy.contains("Serviço cadastrado com sucesso")
    })
  })
  