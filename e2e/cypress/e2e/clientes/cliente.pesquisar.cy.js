describe('Pesquisar Cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.4.1.1 Pesquisar cliente por nome', () => {
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
    })
  })

  it('RF2.4.1.2 Pesquisar cliente por CPF/CNPJ', () => {
    cy.contains('Clientes').click();

    cy.fixture('cliente_editar.json').then((cliente_editar) => {

      cy.get('input[name="pesquisa_documento"]').type(cliente_editar.editado.documento)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente_editar.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', cliente_editar.editado.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente_editar.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente_editar.editado.email);
        });
      });
    })
  })

  it('RF2.4.1.3 Pesquisar cliente por situação', () => {
    cy.contains('Clientes').click();

    cy.fixture('cliente_editar.json').then((cliente_editar) => {
      cy.contains('Situação').click()
      cy.contains('Desativado').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', cliente_editar.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', cliente_editar.editado.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', cliente_editar.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', cliente_editar.editado.email);
          cy.get('.el-table__row').contains('td.el-table_1_column_5', 'Desativado');
        });
      });
    })
  })

  it('RF2.4.1.4 Limpar pesquisa', () => {
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
      cy.contains('Limpar').click()
    })
  })
})
