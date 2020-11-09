const bowTie = '#___gatsby'
const bowTieColor = '#Color'
const buyButton = '#buyButton'
const selectedColor = 'input[type="text"]'
const unitPrice = '.snip-table__item'
const incrementProduct = '.snip-quantity-trigger__btn--add'
const totalProductPrice = '.snip-table__small-col'
const emptyCartButton = '.snip-product__remove'
const myCartNextStepButton = '.snip-btn--right'
const myCartSubTotal = '#snipcart-amount'
const guestCheckoutButton = '#snipcart-guest-checkout'
const billingAddressName = '#snip-name'
const billingAddressStreetAddress1 = '#snip-address1'
const billingAddressCity = '#snip-city'
const billingAddressPostcode = '#snip-postalCode'
const billingAddressEmail = '#snip-email'
const billingAddressNextStepButton = '#snipcart-next'
const shippingMethodWorldwide = '.snip-product--selectable-item'
const shippingMethodNextStepButton = '#snipcart-next'
const paymentMethodNextStepButton = '#snipcart-paymentmethod-pay'
const confirmOrderAddressInformationSections = '.snip-layout__content'
const confirmOrderGrandTotal = '#snipcart-total'
const confirmOrderPlaceOrderButton = '.snip-btn--right'
const bookingReference = '#snipcart-title'
const greenSuccessBanner = '.snip-flash__item--success'

const homePageTitle = 'React & Gatsby shop powered by Snipcart'
const bowTieProduct = 'Bow Ties'
const blueRedBowTie = 'Blue Red'
const whiteBlueBowTie = 'White Blue'
const whiteGreyBowTie = 'White Gray'
const buyForButtonLabel = 'Buy for'
const bowTiePrice = '7'
const bowTiePriceTwice = '14'
const guestCheckoutButtonLabel = 'Checkout'

const customerName = 'James Bond'
const customerFirstAddress = '10 Downing Street'
const customerCity = 'London'
const customerPostcode = 'SW1A 2AA'
const customerEmailAddress = 'jamesbond@gmail.com'
const nextStepButtonLabel = 'Next step'
const worldWideCheckboxLabel = 'Worldwide'

const billingAddressLabel = 'Billing address'
const shippingAddressLabel = 'Shipping address'
const paymentInformationLabel = 'Payment information'
const paymentCreditCardLabel = 'Credit card'
const customerCardCompanyLabel = 'Visa'
const customerPaymentCardFourDigits = '4242'
const bookingSuccessfulMessage = 'Thank you for your order! Your invoice has been sent to you by email, you should receive it soon.'


describe('Snipcart - UI Automation', () => {    
    before(() => {
        cy.visit('https://snipcart-react-gatsby.netlify.app/')
        .title()           
        .should('eq',homePageTitle)      
    })

    describe('When the User select a Product from the Snipcart to Buy', () => {

        it('Then the User can successfully able to choose any colors from the dropdown', () => {    
                
            cy.get(bowTie).children()
                .contains(bowTieProduct)
                .should('be.visible')
                .click()  
            cy.get(bowTieColor)
                .select(blueRedBowTie)
                .contains(blueRedBowTie)
                .should('be.visible')
            cy.get(bowTieColor)
                .select(whiteBlueBowTie)
                .contains(whiteBlueBowTie)
                .should('be.visible')
            cy.get(bowTieColor)
                .select(whiteGreyBowTie)
                .contains(whiteGreyBowTie)
                .should('be.visible')
            cy.url().should('include', 'bow-ties')     
    
        })  

    })

    describe('When the User add the Product to the cart', () => {

        it('Then the User successfully able to Buy the Product', () => {

            cy.get(buyButton)
                .contains(buyForButtonLabel)
                .should('be.visible').click()

            checkMyCart()
            checkGuestCheckout()
            checkBillingAddress()
            checkShipingMethod()

            cy.get(paymentMethodNextStepButton)
                .contains('Next step')
                .should('be.visible')
                .click()

            checkOrderPageBillingAddress()
            checkOrderPageShippingAddress()
            checkOrderePagePaymentInformation()              
    
            cy.get(confirmOrderGrandTotal)
                .contains('35.70').should('be.visible')
    
            cy.get(confirmOrderPlaceOrderButton)
                .scrollIntoView()
                .contains('Place Order')
                .should('be.visible')
                .click()
    
            checkConfirmationPage()   
       })  
    })   
})


function checkMyCart() {
    cy.get(selectedColor)
        .should('have.value', 'White Gray')
    cy.get(unitPrice)
        .children()
        .eq(4)
        .contains(bowTiePrice)
        .should('be.visible')
    cy.get(incrementProduct)
        .should('be.visible')
        .click()
    cy.get(totalProductPrice)
        .contains(bowTiePriceTwice)
        .should('be.visible')
    cy.get(emptyCartButton)
        .should('have.css', 'color')
        .and('equal', 'rgb(255, 17, 0)')      
    cy.get(myCartNextStepButton)
        .should('be.visible')
        .click() 
}

function checkGuestCheckout() {
    cy.get(myCartSubTotal)
        .contains(bowTiePriceTwice)
        .should('be.visible')
    cy.get(guestCheckoutButton)
        .contains(guestCheckoutButtonLabel)
        .should('be.visible')
        .click()
}    

function checkBillingAddress() {
    cy.get(billingAddressName)
        .type(customerName)
    cy.get(billingAddressStreetAddress1)
        .type(customerFirstAddress)
    cy.get(billingAddressCity)
        .type(customerCity)
    cy.get(billingAddressPostcode)
        .type(customerPostcode)
    cy.get(billingAddressEmail)
        .type(customerEmailAddress)
    cy.get(billingAddressNextStepButton)
        .contains(nextStepButtonLabel)
        .should('be.visible')
        .click()
}

function checkShipingMethod() {
    cy.get(shippingMethodWorldwide)
        .contains(worldWideCheckboxLabel)
        .should('be.visible')
        .click()
    cy.get(shippingMethodNextStepButton)
        .contains(nextStepButtonLabel)
        .should('be.visible')
        .click()
}

function checkOrderPageBillingAddress() {
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(billingAddressLabel)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(customerName)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(customerEmailAddress)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(customerFirstAddress)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(customerCity)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(0)
        .contains(customerPostcode)
        .should('be.visible')
}

function checkOrderPageShippingAddress() {
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(shippingAddressLabel)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(customerName)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(customerPostcode)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(customerFirstAddress)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(customerCity)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(1)
        .contains(customerPostcode)
        .should('be.visible')
}

function checkOrderePagePaymentInformation() {
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(2)
        .contains(paymentInformationLabel)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(2)
        .contains(paymentCreditCardLabel)
        .should('be.visible')

    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(2)
        .contains(customerName)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(2)
        .contains(customerCardCompanyLabel)
        .should('be.visible')
    cy.get(confirmOrderAddressInformationSections)
        .children()
        .eq(2)
        .contains(customerPaymentCardFourDigits)
        .should('be.visible')
}

function checkConfirmationPage() {
    cy.get(bookingReference)
        .should('be.visible')
    cy.get('ul')         
        .children(greenSuccessBanner)
        .contains(bookingSuccessfulMessage)
        .should('be.visible')  
}
