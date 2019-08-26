const app = require('../server')
const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const stopApp = require('./stop-app')
chai.use(chaiHttp)

const headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfZnVsbF9uYW1lIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTU2Njg1ODUxOCwiZXhwIjoxNTY2OTQ0OTE4fQ.rkTQB-MPwOefttLr6b9SgkRabAc5_W2Pk3zSapNV2RM'
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
