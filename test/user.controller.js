const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // TODO create this test
    // Warning: the user already exists
    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create a user
      userController.create(user, (err, result) => {
      // Create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
    })
  })

  // TODO Create test for the get method
  describe('Get', ()=> {

     it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create a user
      userController.create(user, (err, result) => {
        // Get user information
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result.firstname).to.be.equal(user.firstname)
          expect(result.lastname).to.be.equal(user.lastname)
          done()
        })
      })
    })

      it('can not get a user when it does not exist', (done) => {
        const nonuser = 'nonExistentUsername'
        // Get information for a non-existent user
        userController.get(nonuser, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
    })

  describe('Update', ()=> {

    it('update a user by username', (done) => {
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
      // Create a user
      userController.create(user, (err, result) => {
        // Update user information
        userController.update(update, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal("OK")
          
          // Get the updated user information
          userController.get(user.username, (err, result) => {
            expect(err).to.be.equal(null)
            expect(result).to.be.deep.equal({
              firstname: 'Andrey',
              lastname: 'Popov'
            })
            })
        })
              done()
      })     
    })
    
    it('can not update a user when it does not exist', (done) => {
          const update = {
            username: 'sergkudinov1',
            firstname: 'Andrey',
            lastname: 'Popov'
          }
      // Attempt to update information for a non-existent user
      userController.update(update, (err, result) => {
        expect(err).to.not.be.equal(null) 
        expect(result).to.be.equal(null)
        done()
      })    
  })
 })

 describe('Delete', () => {

  it('delete a user by username', (done)=>{
    const user = {
      username: 'sergkudinov',
      firstname: 'Sergei',
      lastname: 'Kudinov'
    };
    // Create a user
    userController.create(user, () => {
      // Delete user
      userController.delete(user.username,(err,result) => {
        expect(err).to.be.equal(null);
        expect(result).not.to.be.equal(null)
        // Attempt to get the user information after deletion;
        userController.get(user.username,(err,result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.eql(null);
          done();
        });
      });
    })
  })

  it("can not delete a user that doesn't exist", (done)=>{
    const nonuser = 'nonExistentUsername' 
    // Attempt to delete a non-existent user
    userController.delete(nonuser, (err, result) => {
      expect(err).to.not.be.equal(null)
      expect(result).to.be.equal(null)
      done()
      })
    })
  })
})