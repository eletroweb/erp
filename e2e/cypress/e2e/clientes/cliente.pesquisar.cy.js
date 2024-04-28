describe('Pesquisar Cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
      cy.contains('Clientes').click();
    })
  })

  it('RF2.4.1.1 Pesquisar cliente por nome', () => {
    cy.fixture('cliente.json').then((cliente) => {

      cy.get('input[name="pesquisa_nome"]').type(cliente.nome)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente.email);
        });
      });
    })
  })

  it('RF2.4.1.2 Pesquisar cliente por CPF/CNPJ', () => {
    cy.contains('Clientes').click();

    cy.fixture('cliente.json').then((cliente) => {

      cy.get('input[name="pesquisa_documento"]').type(cliente.documento)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', cliente.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente.email);
        });
      });
    })
  })

  it('RF2.4.1.3 Pesquisar cliente por situação', () => {
    cy.contains('Clientes').click();

    cy.fixture('cliente.json').then((cliente) => {
      cy.contains('Situação').click()
      cy.contains('Ativado').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', cliente.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente.email);
          cy.get('.el-table__row').contains('td.el-table_1_column_5', 'Ativado');
        });
      });
    })
  })
})
