const app = require('../server')
const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const stopApp = require('./stop-app')
chai.use(chaiHttp)

describe('Testando a API rota /', () => {
  before(() => console.log())
  after(() => {
    stopApp()
  })

  it('GET /', () => {
    chai.request(app)
      .get('/')
      .then(res => {
        assert.deepEqual(res.status, 200)
      })
      .catch(console.log)
  })
})
