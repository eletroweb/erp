describe('Cadastrar Cliente', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF2.1 Cadastrar Cliente', () => {
    cy.contains('Clientes').click()
    cy.get('.btnCadastrar').click()
    cy.contains('Cadastrar Cliente')

    cy.fixture('cliente.json').then((cliente) => {
      cy.get('input[name="nome"').type(cliente.nome)
      cy.get('input[name="documento"').type(cliente.documento)
      cy.get('input[name="email"').type(cliente.email)
      cy.get('input[name="telefone"').type(cliente.telefone)
      cy.get('input[name="cep"').type(cliente.cep)
      cy.contains(cliente.setor).click()
      cy.get('#complemento').type(cliente.complemento)
      cy.contains("Salvar").click()
      //cy.contains("Cliente cadastrado com sucesso")
    })
  })
})
