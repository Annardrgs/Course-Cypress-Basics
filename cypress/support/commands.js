Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName').type('Anna Clara', {delay: 0})
        cy.get('#lastName').type('Rodrigues', {delay: 0})
        cy.get('#email').type('anna12345@aaa.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
})