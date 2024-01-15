const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /user', ()=> {
  // TODO Create test for the get method
it('get an existing user', (done) => {
  const user = {
    username: 'sergkudinov',
    firstname: 'Sergei',
    lastname: 'Kudinov'
  }

  // Create the user first
  chai.request(app)
    .post('/user')
    .send(user)
    .then((res) => {
      chai.expect(res).to.have.status(201)
      chai.expect(res.body.status).to.equal('success')
      chai.expect(res).to.be.json
      // Get user information
      chai.request(app)
        .get('/user/' + user.username)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })
    .catch((err) => {
      throw err
    })
})

it('can not get a user when it does not exist', (done) => {
    const nonuser = 'nonExistentUsername'
  chai.request(app)
    .get('/user/' + nonuser)
    .then((res) => {
      chai.expect(res).to.have.status(400)
      chai.expect(res.body.status).to.equal('error')
      chai.expect(res).to.be.json
      done()
    })
    .catch((err) => {
      throw err
    })
})
})

describe('PUT /user', ()=> {
    it('update user information', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      const update = {
        username: 'sergkudinov',
        firstname: 'Andrey',
        lastname: 'Popov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json

        // Update user information
        chai.request(app)
        .put('/user/' + user.username)
        .send(update)
        .then((res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    .catch((err) => {
        throw err
    })
})
    it('can not update a user when it does not exist', (done) => {
      const nonuser = 'nonExistentUsername'
      const update = {
        firstname: 'Andrey',
        lastname: 'Popov'
      }
      // Attempt to update information for a non-existent user
        chai.request(app)
        .put('/user/' + nonuser)
        .send(update)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
      })   
})

describe('DELETE /user', () => {
    it('delete user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
        // Delete user
        chai.request(app)
      .delete('/user/' + user.username)
      .then((res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.status).to.equal('success')
        done()
      })
      .catch((err) => {
         throw err
      })
  })
  .catch((err) => {
    throw err
})
  })
  
  it('can not delete a user when it does not exist', (done) => {
    const nonuser = 'nonExistentUsername'
  
    // Attempt to delete a non-existent user
    chai.request(app)
      .delete('/user/' + nonuser)
      .then((res) => {
        chai.expect(res).to.have.status(400)
        chai.expect(res.body.status).to.equal('error')
        chai.expect(res).to.be.json
        done()
      })
      .catch((err) => {
        throw err
      })
    })
    })
  })