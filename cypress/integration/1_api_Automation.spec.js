var today = new Date().toISOString().slice(0, 10)

describe('API Testing', () => {


    Cypress.config('baseUrl', 'https://api.ratesapi.io/api')

    describe('When the User hits the Latest Endpoint for Foreign Exchange Rates', () => {
        it('Then the User retrieves all the required Exchange Rates', () => {
    
            cy.request('GET', '/latest')
                .then((response) => {
                    expect(response).to.have.property('status', 200)
                    expect(response).to.have.property('statusText', 'OK')
                    expect(response.body).to.not.be.null
                    expect(response.body).to.have.property('base', 'EUR')
                    expect(response.body).to.have.property('rates')
                    expect(response.body).to.have.property('date', today)
                    expect(response.body.rates).to.have.property('GBP')                    
                    expect(response.body.rates).to.have.keys(["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"])
                } )
        })
    })

    describe('When the User hits the Endpoint for Foreign Exchange Rates with Specific Date', () => {
        it('Then the User retrieves all the required Exchange Rates', () => {    
    
            cy.request('GET', '/2010-01-12').then((response) => {
                expect(response).to.have.property('status', 200)
                expect(response).to.have.property('statusText', 'OK')
                    expect(response.body).to.not.be.null
                    expect(response.body).to.have.property('base', 'EUR')
                    expect(response.body).to.have.property('rates')
                    expect(response.body).to.have.property('date', '2010-01-12')
                    expect(response.body.rates).to.have.property('GBP')                    
                    expect(response.body.rates).to.have.keys(["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EEK", "GBP", "HKD", "HRK", "HUF", "IDR", "INR", "JPY", "KRW", "LTL", "LVL", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"])
              
            } )
        })
    })        
})