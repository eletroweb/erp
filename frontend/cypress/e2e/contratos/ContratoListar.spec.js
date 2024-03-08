describe('Contrato', () => {
    it('Listar Contratos', () => {
        cy.visit('http://localhost:5173/')
        cy.contains('Contratos').click()
        // TODO verificar se os itens estão sendo exibidos na listagem
    })
})