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
    })
  })

  it('RF2.4.1.2 Pesquisar cliente por CPF/CNPJ', () => {
    cy.contains('Clientes').click();

    cy.fixture('EDITAR_CLIENTE.json').then((EDITAR_CLIENTE) => {

      cy.get('input[name="pesquisa_documento"]').type(EDITAR_CLIENTE.editado.documento)
      cy.contains('Pesquisar').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', EDITAR_CLIENTE.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', EDITAR_CLIENTE.editado.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', EDITAR_CLIENTE.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', EDITAR_CLIENTE.editado.email);
        });
      });
    })
  })

  it('RF2.4.1.3 Pesquisar cliente por situação', () => {
    cy.contains('Clientes').click();

    cy.fixture('EDITAR_CLIENTE.json').then((EDITAR_CLIENTE) => {
      cy.contains('Situação').click()
      cy.contains('Desativado').click()

      cy.get('table.el-table__body').each(($table) => {
        cy.wrap($table).within(() => {
          cy.get('.el-table__row').contains('td.el-table_1_column_1', EDITAR_CLIENTE.editado.nome);
          cy.get('.el-table__row').contains('td.el-table_1_column_2', EDITAR_CLIENTE.editado.documento);
          cy.get('.el-table__row').contains('td.el-table_1_column_3', EDITAR_CLIENTE.editado.telefone);
          cy.get('.el-table__row').contains('td.el-table_1_column_4', EDITAR_CLIENTE.editado.email);
          cy.get('.el-table__row').contains('td.el-table_1_column_5', 'Desativado');
        });
      });
    })
  })

  it('RF2.4.1.4 Limpar pesquisa', () => {
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
      cy.contains('Limpar').click()
    })
  })
})
