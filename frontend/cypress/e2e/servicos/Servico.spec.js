describe('Servico', () => {
    it('Cadastrar serviço', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Serviços').click()
        cy.contains('Cadastrar')
      cy.get('.btnCadastrar').click()
      cy.get('input[name="descricao"').type('Pintura')
      cy.get('input[name="valor"').type('3400')  
      cy.contains("Engenharia Cívil").click()
      cy.contains("Situação").click()
      cy.contains("Salvar").click()
      cy.contains("Serviço cadastrado com sucesso")
    })

    it('Listar Servicos', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Serviços').click()
        cy.contains('Cadastrar')
      })

    it('Excluir servico', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Serviços').click()
        cy.contains('Editar').click()
        cy.contains('Excluir').click()
        cy.contains('Confirmar').click()
        cy.contains('Serviço excluido com sucesso')
    })
  })