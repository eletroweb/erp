/*describe('Cliente', () => {
  it('Validar duplicidade de email', () => {
    const emailMock = 'cliente1@gmail.com'
    cy.visit('http://localhost:5173/')
    cy.contains('Clientes').click()
    cy.get('.btnCadastrar').click()
    cy.get('input[name="nome"').type('Cliente 1')
    cy.get('input[name="documento"').type('56.437.025/0001-01')
    cy.contains("Selecione o Estado").click()
    cy.contains("PB").click()
    cy.get('input[name="cidade"').type('João Pessoa')
    cy.get('input[name="email"').type(emailMock)
    cy.get('input[name="telefone"').type('839999999')
    cy.contains("Engenharia Cívil").click()
    cy.get('#endereco').type('Rua Exemplo')
    cy.contains("Situação").click()
    cy.contains("Salvar").click()
    cy.contains("Cliente cadastrado com sucesso")

    cy.visit('http://localhost:5173/clientes')
    cy.get('.btnCadastrar').click()
    cy.get('input[name="email"').type(emailMock)
    cy.get('input[name="telefone"').click()
    cy.contains('Atenção')
    cy.contains(`Já existe um cliente com este email ${emailMock}`)
  })
})*/

describe('Validação de duplicidade de email', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
      cy.contains('Clientes').click();
    })
  })

  it('RF2.8 Validar duplicidade de email', () => {
    cy.contains('Clientes').click()
    cy.get('.btnCadastrar').click()
    cy.contains('Cadastrar Cliente')

    cy.fixture('cliente.json').then((cliente) => {
    cy.get('input[name="nome"').type(cliente.nome)
      cy.get('input[name="documento"').type('119.831.360-93')
      cy.contains("Selecione o Estado").click()
      cy.contains(cliente.estado).click()
      cy.get('input[name="cidade"').type(cliente.cidade)
      cy.get('input[name="email"').type(cliente.email)
      cy.get('input[name="telefone"').type(cliente.telefone)
      cy.contains(cliente.setor).click()
      cy.get('#endereco').type(cliente.endereco)
      cy.get('#complemento').type(cliente.complemento)
      cy.contains(`Já existe um cliente com este email`)
  })
})
})
