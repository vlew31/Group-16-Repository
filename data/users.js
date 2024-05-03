import { users } from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
const saltRounds = 2;

export const registerUser = async (
  firstName,
  lastName,
  email,
  username,
  password,
  role
) => {
  if(firstName === undefined || lastName === undefined || email === undefined || username === undefined || password === undefined || role === undefined) {
      throw "All fields need to be supplied";
  }

  const fn = firstName.trim();
  const ln = lastName.trim();
  const e = email.trim();
  const u = username.trim().toLowerCase();
  const p = password.trim();
  const r = role.toLowerCase().trim();

  const letterChecker = /^[a-zA-Z]+$/;
  if(typeof fn !== 'string' || fn.length < 2 || fn.length > 25 || !letterChecker.test(fn)) {
    throw "invalid first name input";
  }

  if(typeof ln !== 'string' || ln.length < 2 || ln.length > 25 || !letterChecker.test(ln)) {
    throw "invalid last name input";
  }

  const emailChecker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(typeof e !== 'string' || emailChecker.test(e) === false) {
    throw "invalid email input";
  }

  if(typeof u !== 'string' || u.length < 5 || ln.length > 10 || !letterChecker.test(u)) {
    throw "invalid username input";
  }

  const upper = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
    throw "invalid password input from registerUser";
  }


  if(r !== 'user' && r !== 'admin') {
    throw "invalid role input";
  }

  const userList = await users();

  let h = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName: fn,
    lastName: ln,
    email: e,
    username: u,
    password: h,
    role: r
  }

  let insertedUser = await userList.insertOne(newUser);
  if (!insertedUser.insertedCount === 0) {
    throw "username taken. try again";
  }

  newUser._id =  newUser._id.toString();

  return { signupCompleted: true };

};

export const loginUser = async (username, password) => {

  const u = username.trim();
  const p = password.trim();

  if(u === undefined || p === undefined) {
    throw "both inputs must be supplied";
  }

  const letterChecker = /^[a-zA-Z]+$/;
  if(typeof u !== 'string' || u.length < 5 || u.length > 10 || !letterChecker.test(u)) {
    throw "invalid username input";
  }

  const upper = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
    throw "invalid password input from loginUser";
  }

  const userList = await users();
  const findUser = await userList.findOne({ username: u });

  if (!findUser) {
    throw "Either the username or password is invalid";
  }

  if (await bcrypt.compare(password, findUser.password) == false) {
    throw "Either the username or password is invalid";
  }
  return {
    firstName: findUser.firstName, 
    lastName: findUser.lastName, 
    email: findUser.email,
    username: findUser.username,  
    role: findUser.role
  };
};

export const get = async (userId) => {
  if(userId === undefined){
    throw 'id not provided';
  } else if(typeof userId !== 'string' || userId.trim().length === 0){
    throw 'parameter is not a valid id';
  } else if(!ObjectId.isValid(userId.trim())){
    throw 'id is not a valid ObjectID'
  } 
  const userCollection = await users();
  const userToFind = await userCollection.findOne({_id: new ObjectId(userId)});
  if(userToFind === null){
    throw 'no user with that id';
  }

  userToFind._id = userToFind._id.toString();
  
  return userToFind;
};


export const getAll = async () => {

  const userCollection = await users();
  let userList = await userCollection.find({}).project({_id: 1, userame: 1}).toArray();

  if(!userList){
    throw 'prducts not found';
  }

  return userList;
};



