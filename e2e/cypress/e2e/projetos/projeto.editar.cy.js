describe('Projetos', () => {

    beforeEach(() => {
        cy.fixture('login.json').then((login) => {
            cy.visit('http://localhost:5173/')
            cy.get('input[type="email"]').type(login.email)
            cy.get('input[type="password"]').type(login.password)
            cy.contains('Entrar').click()
            cy.contains('Projetos').click()
        })
    })

    it('RF4.2 Editar Projeto', () => {
        cy.fixture('projeto_editar.json').then((projeto) => {

            cy.get('.el-table__row').contains('td.el-table_1_column_7', 'Editar').click()

            cy.contains(projeto.original.cliente).click()
            cy.contains('.el-select-dropdown__item', projeto.editado.cliente).click()
            cy.get('input[name="responsavel"]').clear().type(projeto.editado.responsavel)

            cy.contains('.el-radio__label', projeto.editado.setor).click()

            cy.get('input[name="orcamento"]').clear().type(projeto.editado.orcamento)
            
            cy.get('input[name="data_inicio"]').clear().type(projeto.editado.data_inicio)

            cy.get('input[name="data_fim"]').clear().type(projeto.editado.data_fim)

            cy.get('textarea[name="observacao"]').clear({force: true});
            cy.get('textarea[name="observacao"]').click({ force: true }).type(projeto.editado.observacao)
            cy.contains('Salvar alterações').click()

            cy.get('table.el-table__body').each(($table) => {
                cy.wrap($table).within(() => {
                    cy.get('.el-table__row').contains('td.el-table_2_column_8', projeto.editado.cliente)
                    cy.get('.el-table__row').contains('td.el-table_2_column_9', projeto.editado.responsavel)
                    cy.get('.el-table__row').contains('td.el-table_2_column_10', projeto.editado.orcamento)
                    cy.get('.el-table__row').contains('td.el-table_2_column_11', projeto.editado.data_inicio)
                    cy.get('.el-table__row').contains('td.el-table_2_column_12', projeto.editado.data_fim)
                    cy.get('.el-table__row').contains('td.el-table_2_column_13', projeto.editado.situacao)
                })
            })
        })
    })
})