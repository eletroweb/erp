describe('Autenticação usuário restrito', () => {
  it('RF9.1.2 Permitir que o usuário com role restrito tenha acesso limitado as funcionalidades', () => {
    cy.visit('http://localhost:5173')
    cy.get('input[type="email"').type('restrito@gmail.com')
    cy.get('input[type="password"').type('123456')
    cy.contains("Entrar").click()
    cy.contains('Clientes')
    cy.contains('Setores')
  })
})
