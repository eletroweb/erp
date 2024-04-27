describe('Projetos', () => {

    beforeEach(() => {
        cy.fixture('login.json').then((login) => {
            cy.visit('http://localhost:5173/');
            cy.get('input[type="email"]').type(login.email)
            cy.get('input[type="password"]').type(login.password)
            cy.contains('Entrar').click();
            cy.contains('Projetos').click();
        })
    })

    it('RF4.1 Cadastrar Projeto', () => {
        cy.fixture('projeto_cadastrar.json').then((projeto) => {
            cy.contains('Cadastrar').click();
            cy.get('.el-tabs__item').contains('Projeto').click();
            cy.contains('Selecionar o cliente...').click();
            cy.contains('.el-select-dropdown__item', projeto.cliente).click()
            cy.get('input[name="responsavel"]').type(projeto.responsavel)
            cy.contains('.el-radio__label', projeto.setor).click();
            cy.contains('Orçamento').click().type(projeto.orcamento);
            cy.get('input[name="data_inicio"]').type(projeto.data_inicio);
            cy.get('input[name="data_fim"]').type(projeto.data_fim);
            cy.get('textarea[name="observacao"]').click({ force: true }).type(projeto.observacao);
            cy.contains('Salvar').click();

            cy.get('table.el-table__body').each(($table) => {
                cy.wrap($table).within(() => {
                    cy.get('.el-table__row').contains('td.el-table_1_column_1', projeto.cliente);
                    cy.get('.el-table__row').contains('td.el-table_1_column_2', projeto.responsavel);
                    cy.get('.el-table__row').contains('td.el-table_1_column_3', projeto.orcamento);
                    cy.get('.el-table__row').contains('td.el-table_1_column_4', projeto.data_inicio);
                    cy.get('.el-table__row').contains('td.el-table_1_column_5', projeto.data_fim);
                    cy.get('.el-table__row').contains('td.el-table_1_column_6', projeto.situacao);
                });
            });
        });
    });


});