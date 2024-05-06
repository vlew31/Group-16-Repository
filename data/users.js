//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcryptjs";
let saltRounds = 2;
import {ObjectId} from 'mongodb';

export let registerUser = async (
    firstName,
    lastName,
    email,
    username,
    password,
	confirmPassword,
    role
  ) => {
	if(firstName === undefined || lastName === undefined || email === undefined  || username === undefined || password === undefined || confirmPassword === undefined || role === undefined) {
		throw "all fields need to be supplied";
	}
  
	let fn = firstName.trim();
	let ln = lastName.trim();
	let u = username.trim().toLowerCase();
	let p = password.trim();
	let c = confirmPassword.trim();
	let r = role.toLowerCase().trim();
	let e = email.toLowerCase().trim();

	let letterChecker = /^[a-zA-Z]+$/;
	if(typeof fn !== 'string' || fn.length < 2 || fn.length > 25 || !letterChecker.test(fn)) {
	  throw "invalid first name input";
	}
  
	if(typeof ln !== 'string' || ln.length < 2 || ln.length > 25 || !letterChecker.test(ln)) {
	  throw "invalid last name input";
	}

	let emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
	if(!emailTest.test(e)) {
		throw "invalid email input";
	}
  
	if(typeof u !== 'string' || u.length < 5 || !letterChecker.test(u)) {
	  throw "invalid username input";
	}
  
	let upper = /[A-Z]/;
	let number = /[0-9]/;
	let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
	  throw "invalid password input";
	}

	if(p !== c) {
		throw "passwords must match";
	}
  
	if(r !== 'user' && r !== 'admin') {
	  throw "invalid role input";
	}
  
	let userList = await users();

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

	return newUser;
	// return { signupCompleted: true };
  
};

export let loginUser = async (username, password) => {

	if(username === undefined || password === undefined) {
		throw "both inputs must be supplied";
	}

	let u = username.trim();
	let p = password.trim();

	if(u.length <= 0|| p.length <= 0) {
		throw "both inputs must be supplied";
	}

	let letterChecker = /^[a-zA-Z]+$/;
	if(typeof u !== 'string' || u.length < 5  || !letterChecker.test(u)) {
	  throw "invalid username input";
	}

	let upper = /[A-Z]/;
	let number = /[0-9]/;
	let specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
		throw "invalid password input";
	}

	let userList = await users();
	let findUser = await userList.findOne({ username: u });

	if (!findUser) {
		throw "Either the username or password is invalid";
	}

	let pass = await bcrypt.compare(password, findUser.password);

	if (!pass) {
		throw "Either the username or password is invalid";
	}

	return {
		firstName: findUser.firstName, 
		lastName: findUser.lastName, 
		email: findUser.email, 
		username: findUser.username, 
		role: findUser.role
	};

	// return { loginCompleted: true };

};

export let getUser= async (username) => {
	let u = username.trim();

	if(u === undefined) {
		throw "input must be supplied";
	}

	let letterChecker = /^[a-zA-Z]+$/;
	if(typeof u !== 'string' || u.length < 5 || u.length > 10 || !letterChecker.test(u)) {
		throw "invalid username input";
	}

	let userList = await users();
	let findUser = await userList.findOne({ username: u });

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

export let getAll = async () => {

  let userCollection = await users();
  let userList = await userCollection.find({}).project({_id: 1, username: 1}).toArray();

  if(!userList){
    throw 'users not found';
  }

  return userList;
};

export let get = async (userId) => {
  if(userId === undefined){
    throw 'id not provided';
  } else if(typeof userId !== 'string' || userId.trim().length === 0){
    throw 'parameter is not a valid id';
  } else if(!ObjectId.isValid(userId.trim())){
    throw 'id is not a valid ObjectID'
  } 
  let userCollection = await users();
  let userToFind = await userCollection.findOne({_id: new ObjectId(userId)});
  if(userToFind === null){
    throw 'no user with that id';
  }

  userToFind._id = userToFind._id.toString();
  
  return userToFind;
};


// export let remove = async (userId) => {
// 	if (!userId){
// 	  throw 'clothes not found';
// 	} 
// 	if (typeof userId !== 'string'){
// 	  throw 'Id must be a string';
// 	} 

// 	userId = userId.trim();
// 	if (userId.length === 0){
// 	  throw 'id cannot be an empty string or just spaces';
// 	}
  
// 	if (!ObjectId.isValid(userId)){
// 	  throw 'Invalid ObjectId';
// 	} 
  
// 	let usersCollection = await users();
// 	let deletionInfo = await usersCollection.findOneAndDelete({
// 	  _id: new ObjectId(userId)
// 	});
  
// 	if (!deletionInfo) {
// 	  throw `Could not delete clothes with id of ${userId}`;
// 	}
  
// 	return `${deletionInfo.username} has been successfully deleted!`;
// 	//prints "undefined has been successfully deleted!"
//   };