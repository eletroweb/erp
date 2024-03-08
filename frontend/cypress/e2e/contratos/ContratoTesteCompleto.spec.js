describe('Contrato', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
    })

    it('Listar Contratos', () => {
    })

    it('Cadastrar contrato', () => {
        cy.get('.btnCadastrar').click()
        cy.get('input[name="nome"]').type('Contrato 1')
        cy.get('input[name="orcamento"]').type('20000')
        cy.get('input[name="data_inicio"]').click()
        cy.get('.el-date-table').contains('.available', '4').click()
        cy.get('input[name="data_fim"]').type('21/03/2024')
        cy.contains("Situação").click()
        cy.contains("Salvar").click()
    })

    it('Editar contrato', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Contratos').click();
        cy.contains('Editar').click()
        cy.get('input[name="nome"]').clear().type('Contrato 1')
        cy.get('input[name="orcamento"]').clear().type('7200')
        cy.get('input[name="data_inicio"]').click()
        cy.get('.el-date-table').contains('.available', '1').click()
        cy.get('input[name="data_fim"]').clear().type('29/03/2024')
        cy.contains("Situação").click()
        cy.contains("Salvar alterações").click()
    })

    it('Excluir contrato', () => {
        cy.visit('http://localhost:5173/');
        cy.contains('Contratos').click();
        cy.contains('Editar').click()
        cy.contains('Excluir').click()
        cy.contains('Confirmar').click()
        cy.contains('Contratos').click()
    })
})