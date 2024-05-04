// import { users } from '../config/mongoCollections.js';
// import {ObjectId} from 'mongodb';
// import bcrypt from 'bcrypt';
// const saltRounds = 2;

// export const registerUser = async (
//   firstName,
//   lastName,
//   email,
//   username,
//   password,
//   role
// ) => {
//   if(firstName === undefined || lastName === undefined || email === undefined || username === undefined || password === undefined || role === undefined) {
//       throw "All fields need to be supplied";
//   }

//   const fn = firstName.trim();
//   const ln = lastName.trim();
//   const e = email.trim();
//   const u = username.trim().toLowerCase();
//   const p = password.trim();
//   const r = role.toLowerCase().trim();

//   // const letterChecker = /^[a-zA-Z]+$/;
//   // if(typeof fn !== 'string' || fn.length < 2 || fn.length > 25 || !letterChecker.test(fn)) {
//   //   throw "invalid first name input";
//   // }

//   // if(typeof ln !== 'string' || ln.length < 2 || ln.length > 25 || !letterChecker.test(ln)) {
//   //   throw "invalid last name input";
//   // }

//   // const emailChecker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   // if(typeof e !== 'string' || emailChecker.test(e) === false) {
//   //   throw "invalid email input";
//   // }

//   // if(typeof u !== 'string' || u.length < 5 || ln.length > 10 || !letterChecker.test(u)) {
//   //   throw "invalid username input";
//   // }

//   // const upper = /[A-Z]/;
//   // const number = /[0-9]/;
//   // const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
//   // if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
//   //   throw "invalid password input from registerUser";
//   // }


//   // if(r !== 'user' && r !== 'admin') {
//   //   throw "invalid role input";
//   // }

//   const userList = await users();

//   let h = await bcrypt.hash(password, saltRounds);
//   let newUser = {
//     firstName: fn,
//     lastName: ln,
//     email: e,
//     username: u,
//     password: h,
//     role: r
//   }

//   let insertedUser = await userList.insertOne(newUser);
//   if (!insertedUser.insertedCount === 0) {
//     throw "username taken. try again";
//   }

//   newUser._id =  newUser._id.toString();

//   return { signupCompleted: true };
//   return newUser;

// };

// export const loginUser = async (username, password) => {

//   const u = username.trim();
//   const p = password.trim();

//   if(u === undefined || p === undefined) {
//     throw "both inputs must be supplied";
//   }

//   const letterChecker = /^[a-zA-Z]+$/;
//   if(typeof u !== 'string' || u.length < 5 || u.length > 10 || !letterChecker.test(u)) {
//     throw "invalid username input";
//   }

//   const upper = /[A-Z]/;
//   const number = /[0-9]/;
//   const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
//   if(typeof p !== 'string' || p.length < 8 || !upper.test(p) || !number.test(p) || !specialChar.test(p)) {
//     throw "invalid password input from loginUser";
//   }

//   const userList = await users();
//   const findUser = await userList.findOne({ username: u });

//   if (!findUser) {
//     throw "Either the username or password is invalid";
//   }

//   if (await bcrypt.compare(password, findUser.password) == false) {
//     throw "Either the username or password is invalid";
//   }
//   return {
//     firstName: findUser.firstName, 
//     lastName: findUser.lastName, 
//     email: findUser.email,
//     username: findUser.username,  
//     role: findUser.role
//   };
// };

// export const get = async (userId) => {
//   if(userId === undefined){
//     throw 'id not provided';
//   } else if(typeof userId !== 'string' || userId.trim().length === 0){
//     throw 'parameter is not a valid id';
//   } else if(!ObjectId.isValid(userId.trim())){
//     throw 'id is not a valid ObjectID'
//   } 
//   const userCollection = await users();
//   const userToFind = await userCollection.findOne({_id: new ObjectId(userId)});
//   if(userToFind === null){
//     throw 'no user with that id';
//   }

//   userToFind._id = userToFind._id.toString();
  
//   return userToFind;
// };


// export const getAll = async () => {

//   const userCollection = await users();
//   let userList = await userCollection.find({}).project({_id: 1, userame: 1}).toArray();

//   if(!userList){
//     throw 'prducts not found';
//   }

//   return userList;
// };



//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcryptjs";
import {ObjectId} from 'mongodb';

export const registerUser = async (
    firstName,
    lastName,
    email,
    username,
    password,
    role,
	listings
  ) => {
	firstName = firstName.trim();
	lastName = lastName.trim();
  	email = email.trim();
	username = username.trim();
	password = password.trim();
	role = role.trim();
	// checkRequiredFields(
	// 	firstName,
	// 	lastName,
	// 	username,
	// 	password,
	// 	favoriteQuote,
	// 	themePreference,
	// 	role
	// );
	// checkIfFieldsAreProperString(
	// 	firstName,
	// 	lastName,
	// 	username,
	// 	password,
	// 	favoriteQuote,
	// 	themePreference,
	// 	role
	// );
	// //first
	// checkIsProperLength(firstName, 2);
	// checkMaxLength(firstName, 25);
	// checkIfContainsNumber(firstName);
	// //last
	// checkIsProperLength(lastName, 2);
	// checkMaxLength(lastName, 25);
	// checkIfContainsNumber(lastName);
	// //user
	// checkIsProperLength(username, 5);
	// checkMaxLength(username, 10);
	// checkIfContainsNumber(username);

	// console.log("here1");
	//check duplicate
	const lowercaseUsername = username.toLowerCase();
	const usersCollection = await users();
	const existingUser = await usersCollection.findOne({
		username: lowercaseUsername,
	});
	if (existingUser) {
		throw "ERR: user already exists";
	}
	// console.log("here2");

	//pw
	// checkIsProperLength(password, 8);
	// if (
	// 	/\s/.test(password) ||
	// 	!/[A-Z]/.test(password) ||
	// 	!/\d/.test(password) ||
	// 	!/[!@#$%^&*(),.?":{}|<>]/.test(password)
	// ) {
	// 	throw "ERR: invalid password";
	// }

	//quote
	// checkIsProperLength(favoriteQuote, 20);
	// checkMaxLength(favoriteQuote, 255);

	//theme
	// const lowercaseThemePreference = themePreference.toLowerCase();
	// if (
	// 	lowercaseThemePreference !== "light" &&
	// 	lowercaseThemePreference !== "dark"
	// ) {
	// 	throw "ERR: Invalid themePreference";
	// }

	//role
	const lowercaseRole = role.toLowerCase();
	if (lowercaseRole !== "admin" && lowercaseRole !== "user") {
		throw "ERR: Invalid role";
	}

	//TODO! change 2 to 16 or smthing
	const hashedPassword = await bcrypt.hash(password, 2);
	const newUser = {
		firstName: firstName.trim(),
		lastName: lastName.trim(),
    	email: email.trim(),
		username: lowercaseUsername,
		password: hashedPassword,
		role: lowercaseRole,
		listings: []
	};
	const insertedUser = await usersCollection.insertOne(newUser);

	if (insertedUser.insertedId) {
		return { signupCompleted: true };
	} else {
		throw "ERR: Failed to register user";
	}
};

export const loginUser = async (username, password) => {
	username = username.trim();
	password = password.trim();

	// checkRequiredFields(username, password);

	// //username
	// checkIsProperLength(username, 5);
	// checkMaxLength(username, 10);
	// checkIfContainsNumber(username);
	const lowercaseUsername = username.toLowerCase();

	//pasword
	// checkIsProperLength(password, 8);
	// if (
	// 	/\s/.test(password) ||
	// 	!/[A-Z]/.test(password) ||
	// 	!/\d/.test(password) ||
	// 	!/[!@#$%^&*(),.?":{}|<>]/.test(password)
	// ) {
	// 	throw "ERR: invalid password";
	// }

	const usersCollection = await users();
	const user = usersCollection.findOne({
		username: lowercaseUsername,
	});
	if (!user) {
		throw "Either the username or password is invalid";
	}
	const passwordMatch = bcrypt.compare(password, password);
	if (!passwordMatch) {
		throw "Either the username or password is invalid";
	}

	const newUser = await usersCollection.findOne(
		{ username: username },
		{ projection: { password: 0 } }
	);
	const {
		firstName,
		lastName,
   	 	email,
		username: storedUsername,
		role,
		listings
	} = newUser;

	return {
		firstName,
		lastName,
 		email,
		username: storedUsername,
		role,
		listings
	};
};

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