describe('Contrato', () => {
    it('Listar Contratos', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
    })
})