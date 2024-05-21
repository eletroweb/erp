describe('Excluir Fornecedor', () => {

    beforeEach(() => {
      cy.fixture('login.json').then((login) => {
        cy.visit('http://localhost:5173/');
        cy.get('input[type="email"]').type(login.email)
        cy.get('input[type="password"]').type(login.password)
        cy.contains('Entrar').click();
      })
    })
  
    it('RF13.3 Excluir Fornecedor', () => {
      cy.fixture('fornecedor_editar.json').then((fornecedor) => {
      cy.contains('Fornecedores').click();
      cy.get('.el-table__row').contains('td.el-table_1_column_5', 'Editar').click()
      cy.contains('Excluir').click()
      cy.contains('Confirmar').click()
      cy.contains(`Fornecedor ${fornecedor.editado.nome} excluído com sucesso`).should('be.visible')
      cy.contains('Nenhum fornecedor cadastrado').should('be.visible')
      })
    })
})