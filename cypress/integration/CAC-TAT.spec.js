// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Anna Clara', {delay: 0})
        cy.get('#lastName').type('Rodrigues', {delay: 0})
        cy.get('#email').type('anna12345@aaa,com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('se um valor não-numérico for digitado, o campo telefone deve continuar vazio', function(){
        cy.get('#phone')
        .type('abcdefghijklmnopqrstuvwxyz', {delay: 0})
        .should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox').click()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Anna Clara', {delay: 0}).should('have.value', 'Anna Clara')
        cy.get('#lastName').type('Rodrigues', {delay: 0}).should('have.value', 'Rodrigues')
        cy.get('#email').type('anna12345@aaa.com', {delay: 0}).should('have.value', 'anna12345@aaa.com')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('21999999999', {delay: 0}).should('have.value', '21999999999')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube)', function() {
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog)', function() {
        cy.get('#product')
        .select('blog')
        .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check('feedback')
    })
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').last().uncheck()
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#phone-checkbox').check()
        cy.get('#firstName').type('Anna Clara', {delay: 0})
        cy.get('#lastName').type('Rodrigues', {delay: 0})
        cy.get('#email').type('anna12345@aaa.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
    })
    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
    })
    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture("example.json").as('exampleFile')
        cy.get('#file-upload')
        .selectFile('@exampleFile')
    })
    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a').should('have.attr', 'target', '_blank')
    })
    it.only('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing ').should('be.visible')
    })
})