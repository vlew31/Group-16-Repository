//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcryptjs";
const saltRounds = 2;
import {ObjectId} from 'mongodb';

export const registerUser = async (
    firstName,
    lastName,
    email,
    username,
    password,
	confirmPassword,
    role
  ) => {
	if(firstName === undefined || lastName === undefined || username === undefined || password === undefined || confirmPassword === undefined || role === undefined) {
		throw "all fields need to be supplied";
	}
  
	const fn = firstName.trim();
	const ln = lastName.trim();
	const u = username.trim().toLowerCase();
	const p = password.trim();
	const c = confirmPassword.trim();
	const r = role.toLowerCase().trim();
	const e = email.toLowerCase().trim();

	// const letterChecker = /^[a-zA-Z]+$/;
	// if(typeof fn !== 'string' || fn.length < 2 || fn.length > 25 || !letterChecker.test(fn)) {
	//   throw "invalid first name input";
	// }
  
	// if(typeof ln !== 'string' || ln.length < 2 || ln.length > 25 || !letterChecker.test(ln)) {
	//   throw "invalid last name input";
	// }

	// const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	// if(!emailTest.test(e)) {
	// 	throw "invalid email input";
	// }
  
	// if(typeof u !== 'string' || u.length < 5 || ln.length > 10 || !letterChecker.test(u)) {
	//   throw "invalid username input";
	// }
  
	// const upper = /[A-Z]/;
	// const number = /[0-9]/;
	// const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	// if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
	//   throw "invalid password input from registerUser";
	// }

	// if(p !== c) {
	// 	throw "passwords must match";
	// }
  
	// if(r !== 'user' && r !== 'admin') {
	//   throw "invalid role input";
	// }
  
	const userList = await users();

	let emailChecker = await userList.findOne({ email: e });
	if(emailChecker) {
		throw "email taken. try again";
	}

	let usernameChecker = await userList.findOne({ username: u });
	if(usernameChecker) {
		throw "email taken. try again";
	}
  
	let h = await bcrypt.hash(password, saltRounds);
	let h1 = await bcrypt.hash(confirmPassword, saltRounds);
	let newUser = {
	  firstName: fn,
	  lastName: ln,
	  email: e,
	  username: u,
	  password: h,
	  confirmPassword: h1,
	  role: r
	}
  
	let user = await userList.insertOne(newUser);
	if (!user.insertedCount === 0) {
	  throw "could not create an account. try again";
	}

	return { signupCompleted: true };
  
};

export const loginUser = async (username, password) => {
	const u = username.trim();
	const p = password.trim();

	// if(u === undefined || p === undefined) {
	// 	throw "both inputs must be supplied";
	// }

	// const letterChecker = /^[a-zA-Z]+$/;
	// if(typeof u !== 'string' || u.length < 5 || u.length > 10 || !letterChecker.test(u)) {
	// 	throw "invalid username input";
	// }

	// const upper = /[A-Z]/;
	// const number = /[0-9]/;
	// const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	// if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
	// 	throw "invalid password input from loginUser";
	// }

	const userList = await users();
	const findUser = await userList.findOne({ username: u });

	// if (!findUser) {
	// 	throw "Either the username or password is invalid";
	// }

	let pass = await bcrypt.compare(password, findUser.password);

	// if (!pass) {
	// 	throw "Either the username or password is invalid";
	// }

	return {
		firstName: findUser.firstName, 
		lastName: findUser.lastName, 
		email: findUser.email, 
		username: findUser.username, 
		role: findUser.role
	};

};

export const getUser= async (username) => {
	const u = username.trim();

	if(u === undefined) {
		throw "input must be supplied";
	}

	const letterChecker = /^[a-zA-Z]+$/;
	if(typeof u !== 'string' || u.length < 5 || u.length > 10 || !letterChecker.test(u)) {
		throw "invalid username input";
	}

	const userList = await users();
	const findUser = await userList.findOne({ username: u });

	if (!findUser) {
		throw "Either the username or password is invalid";
	}

	return {
		firstName: findUser.firstName, 
		lastName: findUser.lastName, 
		email: findUser.email, 
		username: findUser.username, 
		role: findUser.role
	};

} 

export const getAll = async () => {

  const userCollection = await users();
  let userList = await userCollection.find({}).project({_id: 1, username: 1}).toArray();

  if(!userList){
    throw 'users not found';
  }

  return userList;
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