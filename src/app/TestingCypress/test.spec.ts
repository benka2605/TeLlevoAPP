describe('My First Test', () => {
    it('primer testing',()=>{
        cy.visit('/login')
        cy.get('input[name="email"]').type('to.arriagadav@duocuc.cl')
        cy.get('input[name="password"]').type('123456')
        cy.get('button[name="ok"]').click()
    })
    it('segundo testing',()=>{
        cy.visit('/register')
        cy.get('input[name="username"]').type('testing_1')
        cy.get('input[name="email"]').type('testing1@gmail.com')
        cy.get('input[name="password"]').type('123456')
        cy.get('button').click()
    })
    it('tercer testing',()=>{
        cy.visit('/restablecer')
        cy.get('input[name="email"]').type('to.arriagadav@duocu.cl')
        cy.get('button[name="ok"]').click()
    })
    it('cuarto testing',()=>{
        cy.visit('/programar')
        cy.get('input[name="costo"]').type('2000')
        cy.get('input[name="asiento"]').type('4')
        cy.get('ion-button[name="select"]').click()
        cy.get('div[name="mapa"]').click()
        cy.wait(3000)
        cy.get('ion-button[name="confirmar"]').click()
        cy.get('ion-button[name="btn"]').click()
        cy.get('textarea[name="encuentro"]').type('Entrada DuocUc')
    })
    it('quinto testing',()=>{
        cy.visit('/login')
        cy.get('input[name="email"]').type('bene.munoz@duocuc.cl')
        cy.get('input[name="password"]').type('123456')
        cy.get('button[name="ok"]').click()
        cy.wait(2000)
        cy.visit('/home')
        cy.wait(2000)
        cy.get('ion-button[name="historial"]').click()
        cy.get('ion-button[name="cerrar"]').click()
        cy.wait(1000)
        cy.get('button[class="alert-button ion-focusable ion-activatable alert-button-role-confirm sc-ion-alert-md"]').click()
        cy.visit('/login')
    })
  })