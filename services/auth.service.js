// TODO: Create auth service that will do the following:
// 1. Create a method that will take in an email and password; based on the email,
//      find the user in the database and compare the password. If the password is correct, then
//      generate a token and store it in the database. If the user already owns a token in
//      the database we have to delete the previous token before creating a new one. and then we have to return the token.

const Token = require('../models/token.model');
const tokens = require('../databases/tokens');
const {usersService}=require('./users.service');
const crypto = require('crypto');


class AuthService{
  database;
  userDB;

constructor(database,userService) {
      this.database = database;
      this.userDB = userService;
  }

  checkUser(email,password) {
   
    const user = this.userDB.find().find(user => user.email === email);
    
     if (!user) {
            throw new Error('User not found');
        }

      if(user.password==password){
          const token = this.findOneOrFail(user.id);
          const newToken=crypto.randomBytes(64).toString('hex');

          if(token){
            this.delete(user.id);
            }   
            this.saveToken(user.id,newToken);

          return newToken;
      }

      else{
         throw new Error("The entered info not correct!");
       }
   
}

  findOneOrFail(id) {
    const user = this.database.find(user => user.id === id);
    return user;
  }
  saveToken(id,newToken){
        const userToken = new Token(id,newToken);
        this.database.push(userToken);
  }  
  delete(user) {
      this.database.splice(this.database.indexOf(user), 1);
  }
     
// 2. Create a method that will take in a token and return the user's who owns the token.

  checkToken(token){
    
      const id=this.database.find(userToken => userToken.token === token);

        if(!id){
          throw new Error("There is no token");
        }
        const user=this.userDB.findOneOrFail(id.id);

          return user; 
      }
}

 const authService = new AuthService(tokens,usersService);
 module.exports = { authService };


