describe('Cadastrar Fornecedor', () => {

  beforeEach(() => {
    cy.fixture('login.json').then((login) => {
      cy.visit('http://localhost:5173/');
      cy.get('input[type="email"]').type(login.email)
      cy.get('input[type="password"]').type(login.password)
      cy.contains('Entrar').click();
    })
  })

  it('RF13.1 Cadastrar Fornecedor', () => {
    cy.contains('Fornecedores').click()
    cy.get('.card-header > .el-button > span').click()
    cy.contains('Cadastrar Fornecedor')

    cy.fixture('fornecedor.json').then((fornecedor) => {
      cy.get('input[name="nome"').type(fornecedor.nome)
      cy.get('input[name="documento"').type(fornecedor.documento)
      cy.contains("Selecione o Estado").click()
      cy.contains(fornecedor.estado).click()
      cy.get('input[name="cidade"').type(fornecedor.cidade)
      cy.get('input[name="email"').type(fornecedor.email)
      cy.get('input[name="telefone"').type(fornecedor.telefone)
      cy.get('#endereco').type(fornecedor.endereco)
      cy.get('#complemento').type(fornecedor.complemento)
      cy.contains("Situação").click()
      cy.contains("Salvar").click()
      cy.contains("Fornecedor cadastrado com sucesso")
    })
  })
})
