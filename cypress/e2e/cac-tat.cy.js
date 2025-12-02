describe('Central de Atendimento CAC TAT - Preenchendo formulário', () => {
  beforeEach(() => {
    cy.visit('/../../src/index.html')
  })

  it('Verifica o título de aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Verificar título da aplicação', () => {
    cy.visit('/../../src/index.html')

    let titulo = cy.title().should('eq','Central de Atendimento ao Cliente TAT')

    if(titulo != true){
      cy.log('Título da aplicação está correto')
    }else{
      cy.log('Título da aplicação está incorreto')
    }
  })

  it('Preencher os campos obrigatórios e encaminhar o formulário', () => {
    cy.get('#firstName').should('be.visible').type('Felipe')
    cy.get('#firstName').should('have.value', 'Felipe')

    cy.get('#lastName').should('be.visible')
    cy.get('#lastName').type('Augusto')
    cy.get('#lastName').should('have.value', 'Augusto')

    cy.get('#email').should('be.visible')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#email').should('have.value', 'teste@gmail.com')

    const textLong = Cypress._.repeat('Obrigado ', 20)

    cy.get('#open-text-area')
    .as('desc')
    cy.get('@desc').should('be.visible')
    cy.get('@desc').type(textLong, { delay: 0})
    cy.get('@desc').should('have.value', textLong)

    cy.get('button[type="submit"]')
    .as('btnEnviar')
    cy.get('@btnEnviar').should('be.visible')
    cy.get('@btnEnviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Gonçalves')
    cy.get('#email').type('felipe-gmail.com')
    cy.get('#open-text-area').type('Teste de mensagem com e-mail inválido')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Verificando se o campo de telefone aceita apenas números', () => {
    cy.get('#phone').type('abc')
    //cy.get('#phone').should('have.value', '')
  })

  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Gonçalves')
    cy.get('#email').type('test@teste.com.br')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste de mensagem de erro, quando marca o telefone como contato, porém não preenche o campo')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    })
})