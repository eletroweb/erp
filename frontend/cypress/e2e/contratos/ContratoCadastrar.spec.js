describe('Contratos', () => {
    it('Cadastrar contrato', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
        cy.get('.btnCadastrar').click()
        cy.get('input[name="nome"').type('Serviço de Fundação')
        cy.get('input[placeholder="Orçamento"').type('20000')
        cy.get('input[name="data_inicio"]').click()
        cy.get('.el-date-table').contains('.available', '4').click()
        cy.get('input[name="data_fim"]').type('21/03/2024');
        cy.contains("Situação").click()
        cy.contains("Salvar").click()
    })
})