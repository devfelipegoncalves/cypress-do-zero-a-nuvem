describe('Central de Atendimentos CAC TAT', () => {
  it('Verifica o título de aplicação', () => {
    cy.visit('/../../src/index.html')

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
})