const app = require('../server')
const ChaiHttp = require('chai-http')
const chai = require('chai')
const stopApp = require('./stop-app')

const assert = chai.assert
chai.use(ChaiHttp)

const headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfZnVsbF9uYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTU2NzI4ODkyOCwiZXhwIjoxNTY3Mzc1MzI4fQ.B7SfwjduD7EJHfp4CS_-WHXbrgVelxdm2xggWmymFjQ'
}

describe('Verificando rota /aspectos', () => {
  after(() => {
    stopApp()
  })

  it('GET /aspectos status 200', () => {
    chai.request(app)
      .get('/aspectos')
      .set(headers)
      .then(res => {
        assert.deepEqual(res.status, 200)
      })
      .catch(console.log)
  })

  it('GET /aspectos verifica os dados', () => {
    chai.request(app)
      .get('/aspectos')
      .set(headers)
      .then(res => {
        assert.deepEqual(res.body[0].aspecto, 'MUCOPURULENTO')
      })
      .catch(console.log)
  })
})
