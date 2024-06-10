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
    cy.fixture('EDITAR_CLIENTE.json').then((EDITAR_CLIENTE) => {

      cy.get('input[name="pesquisa_nome"]').type(EDITAR_CLIENTE.editado.nome)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', EDITAR_CLIENTE.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', EDITAR_CLIENTE.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', EDITAR_CLIENTE.editado.email);
        });
      });

      cy.get('.el-table__row').contains('td.el-table_1_column_6', 'Editar').click()
      cy.contains('Excluir').click()
      cy.contains(`Deseja confirma a exclusão do cliente ${EDITAR_CLIENTE.editado.nome}`).click()
      cy.contains('Confirmar').click()
      cy.contains(`Cliente ${EDITAR_CLIENTE.editado.nome} excluído com sucesso`).should('be.visible')
      cy.contains('Limpar').click()
      cy.contains(`Nenhum cliente cadastrado`).should('be.visible')
    })
  })
})
