describe('Validação de telefone', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.10 Validar telefone', () => {
    cy.contains('Clientes').click()
    cy.get('.btnCadastrar').click()
    cy.contains('Cadastrar Cliente')

    cy.fixture('cliente.json').then((cliente) => {
      cy.get('input[name="nome"').type(cliente.nome)
      cy.get('input[name="documento"').type('119.831.360-93')
      cy.contains("Selecione o Estado").click()
      cy.contains(cliente.estado).click()
      cy.get('input[name="cidade"').type(cliente.cidade)
      cy.get('input[name="email"').type('clienteqa3@email.com')
      cy.contains(cliente.setor).click()
      cy.get('#endereco').type(cliente.endereco)
      cy.get('#complemento').type(cliente.complemento)
      cy.contains("Situação").click()
      cy.contains("Salvar").click()
      cy.contains("O telefone deve ser informado")
    })
  })
})
