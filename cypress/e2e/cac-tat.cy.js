describe('Central de Atendimento CAC TAT - Preenchendo formulário', () => {
  beforeEach(() => {
    cy.visit('/../../src/index.html')
  })

  it('Verifica o título de aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Verificar título da aplicação', () => {

    let titulo = cy.title().should('eq','Central de Atendimento ao Cliente TAT')

    if(titulo != true){
      cy.log('Título da aplicação está correto')
    }else{
      cy.log('Título da aplicação está incorreto')
    }
  })
  it('Preencher os campos obrigatórios e encaminhar o formulário', () => {
    cy.clock()
  
    cy.get('#firstName')
      .should('be.visible')
      .type('Felipe')
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
  
    cy.contains('Enviar')
      .as('btnEnviar')
    cy.get('@btnEnviar').should('be.visible')
    cy.get('@btnEnviar').click()
  
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
    })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Gonçalves')
    cy.get('#email').type('felipe-gmail.com')
    cy.get('#open-text-area').type('Teste de mensagem com e-mail inválido')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('Verificando se o campo de telefone aceita apenas números', () => {
    cy.get('#phone').type('abc')
    //cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Gonçalves')
    cy.get('#email').type('test@teste.com.br')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste de mensagem de erro, quando marca o telefone como contato, porém não preenche o campo')
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
          .type('Felipe')
          .should('have.value', 'Felipe')
          .clear()
          .should('have.value', '')

        cy.get('#lastName')
          .type('Gonçalves')
          .should('have.value', 'Gonçalves')
          .clear()
          .should('have.value', '')

          cy.get('#email')
            .type('felipe@teste.com.br')
            .should('have.value', 'felipe@teste.com.br')
            .clear()
            .should('have.value', '')
        
          cy.get('#phone')
            .type('40028922')
            .should('have.value', '40028922')
            .clear()
            .should('have.value', '')
    }) 

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()

        cy.contains('Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => { 

      cy.clock()
      // sem data dados
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => { 

      cy.clock()
      // com data
      const data = {
        firstName: 'Felipe',
        lastName: 'Gonçalves',
        email:'dev.felipegon@gmail.com',
        text: 'Teste com data'
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {

      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

    it('Verificação utilizando o contains', () => {
      cy.clock()

      cy.get('#firstName')
        .should('be.visible')
        .type('Felipe')
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

      cy.contains('Enviar')
        .click()

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')

    })
  /*
    it.only('teste de seleção de opções aleatórias no menu de dropdown', () => {
      cy.get('#product')
        .its('length', {log: false}).then(n => {
            cy.get('option').select(Cypress._.random(n-1))
        })

    })
  */

    it('Seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube')

      cy.should('have.value', 'youtube')
    })

    it('Selecionaa um produto (Mentoria) por seu valor (value)', () =>{
      cy.get('#product').select('mentoria')

      cy.should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () =>{
      cy.get('#product').select(1)

      cy.should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () =>{
      cy.get('input[type="radio"]').check('feedback')
      .should('have.value', 'feedback')
    })

    it('Marca o tipo de atendimento "Feedback versão 2"', () =>{
      cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
    })

    it('Marca cada tipo de atendimento', () =>{
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
    })

    it('Marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]')
        .as('checkboxes')

      cy.get('@checkboxes')
        .check()

      cy.get('@checkboxes')
        .last()
        .uncheck()
        .should('not.be.checked')
      
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json')
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json', {encoding: null})
        .as('exampleFile')
        
      cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .then(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
      //cy.get('#privacy a')
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
      
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', ()=> {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')

      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
    })

    it('preenche o campo da área de texto usando o comando invoke', () =>{
      cy.get('#open-text-area')
        .invoke('val', 'um texto qualquer')
        .should('have.value', 'um texto qualquer')
    })

    it('faz uma requisição HTTP', () => {
      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')
        .its('status')
        .should('be.equal', 200)

      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')

      cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
    })

    it('Desafio do gato', () => {
      cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .invoke('hide')
        .should('not.be.visible')
    })

    it.only('Gato talkabout', ()=>{
      cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')

      cy.get('#title')
        .invoke('text', 'CAT - TAT')
      
      cy.get('#subtitle')
        .invoke('text', 'Eu ❤️ gatos')
    })

})