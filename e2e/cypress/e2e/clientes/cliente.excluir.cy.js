describe('Excluir cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.3 Excluir Cliente', () => {
    cy.contains('Clientes').click();
    cy.fixture('cliente_editar.json').then((cliente_editar) => {

      cy.get('input[name="pesquisa_nome"]').type(cliente_editar.editado.nome)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente_editar.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente_editar.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente_editar.editado.email);
        });
      });

      cy.get('.el-table__row').contains('td.el-table_1_column_6', 'Editar').click()
      cy.contains('Excluir').click()
      cy.contains(`Deseja confirma a exclusão do cliente ${cliente_editar.editado.nome}`).click()
      cy.contains('Confirmar').click()
      cy.contains(`Cliente ${cliente_editar.editado.nome} excluído com sucesso`).should('be.visible')
      cy.contains('Limpar').click()
      cy.contains(`Nenhum cliente cadastrado`).should('be.visible')
    })
  })
})
