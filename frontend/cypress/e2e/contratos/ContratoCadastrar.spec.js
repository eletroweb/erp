describe('Contratos', () => {
    it('Cadastrar contrato', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
        cy.get('.btnCadastrar').click()
        cy.get('input[name="nome"').type('Serviço de Fundação')
        cy.get('input[placeholder="Orçamento"').type('20000')
        cy.get('input[placeholder="Data Início"]').click()
        cy.get('.el-date-picker__body').should('be.visible')
        cy.get('.el-date-table-cell__text').contains('4').click()
    })
})