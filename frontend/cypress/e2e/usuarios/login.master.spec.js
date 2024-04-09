describe('Autenticação usuário master', () => {
  it('RF9.1.1 Permitir que o usuário com role master tenha acesso a todas as funcionalidades', () => {
    cy.visit('http://localhost:5173')
    cy.get('input[type="email"').type('master@gmail.com')
    cy.get('input[type="password"').type('123456')
    cy.contains("Entrar").click()
    cy.contains('Clientes')
    cy.contains('Setores')
    cy.contains('Contratos')
    cy.contains('Projetos')
    cy.contains('Ordem Serviço')
    cy.contains('Configurações')
  })
})
