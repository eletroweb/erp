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

    it('RF4.3 Excluir Projeto', () => {
        cy.get('.el-table__row').contains('td.el-table_1_column_7', 'Editar').click()
        cy.contains('Excluir').click()
        cy.contains('Confirmar').click()
        cy.contains('Projeto undefined excluído com sucesso').should('be.visible')
        cy.contains('Nenhum projeto cadastrado').should('be.visible')
    })
})