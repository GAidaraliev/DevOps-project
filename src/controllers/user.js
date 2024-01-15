const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong parameters for create"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Check if user already exists
    db.exists(user.username, function(err, userExists){
     if(err) return callback(err, null)
     if(userExists) return callback(new Error("User already exists"), null)
    // Save to DB
     else {
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res)
      })
    }
    })
  },

  get: (username, callback) => {
    if(!username)
      return callback(new Error("Username must be provided"), null)
    db.hgetall(username, function(err, res) {
      if (err) return callback(err, null)
      if (res)
        callback(null, res)
      else
        callback(new Error("User doesn't exists"), null)
    })
  },

  update: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong parameters for update"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    // Check if user already exists
    db.exists(user.username, function(err, userExists){
      if(err) return callback(err, null)
      if(!userExists) return callback(new Error("User not found"), null)
     // Update user information
      else {
       db.hmset(user.username, userObj, (err, res) => {
         if (err) return callback(err, null)
         callback(null, res) // Return callback
       })
    }
    })  
  },
  
  delete: (username, callback) => {
    // Check parameters
    if(!username)
      return callback(new Error("Wrong parameters for delete"), null)
    // Check if user already exists
    db.exists(username, function(err, userExists){
      if(err) return callback(err, null)
      if(!userExists) return callback(new Error("User not found"), null)
    // Delete user from DB
      else {
       db.del(username, function(err, res) {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    }
    })  
  }
}
