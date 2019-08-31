const app = require('../server')
const ChaiHttp = require('chai-http')
const chai = require('chai')

const assert = chai.assert
chai.use(ChaiHttp)

describe('Testando a API rota /', () => {
  it('GET / verifica status 200', () => {
    chai.request(app)
      .get('/')
      .then(res => {
        assert.deepEqual(res.status, 200)
      })
      .catch(console.log)
  })
})
