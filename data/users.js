
  //import mongo collections, bcrypt and implement the following data functions
  import { users } from "../config/mongoCollections.js";
  import bcrypt from "bcryptjs";
//   export const registerUser = async (
// 	  firstName,
// 	  lastName,
// 	  email,
// 	  username,
// 	  password,
// 	  role
// 	) => {
// 	  firstName = firstName.trim();
// 	  lastName = lastName.trim();
// 	  email = email.trim();
// 	  username = username.trim();
// 	  password = password.trim();
// 	  role = role.trim();
	  
// 	  const lowercaseUsername = username.toLowerCase();
// 	  const usersCollection = await users();
// 	  const existingUser = await usersCollection.findOne({
// 		  username: lowercaseUsername,
// 	  });
// 	  if (existingUser) {
// 		  throw "ERR: user already exists";
// 	  }
  
// 	  const lowercaseRole = role.toLowerCase();
// 	  if (lowercaseRole !== "admin" && lowercaseRole !== "user") {
// 		  throw "ERR: Invalid role";
// 	  }
  
// 	  //TODO! change 2 to 16 or smthing
// 	  const hashedPassword = await bcrypt.hash(password, 2);
// 	  const newUser = {
// 		  firstName: firstName.trim(),
// 		  lastName: lastName.trim(),
// 	  email: email.trim(),
// 		  username: lowercaseUsername,
// 		  password: hashedPassword,
// 		  role: lowercaseRole,
// 	  };
// 	  const insertedUser = await usersCollection.insertOne(newUser);
  
// 	  if (insertedUser.insertedId) {
// 		  return { signupCompleted: true };
// 	  } else {
// 		  throw "ERR: Failed to register user";
// 	  }
//   };
  
//   export const loginUser = async (username, password) => {
// 	  username = username.trim();
// 	  password = password.trim();
  
// 	  // checkRequiredFields(username, password);
  
// 	  // //username
// 	  // checkIsProperLength(username, 5);
// 	  // checkMaxLength(username, 10);
// 	  // checkIfContainsNumber(username);
// 	  const lowercaseUsername = username.toLowerCase();
  
// 	  //pasword
// 	  // checkIsProperLength(password, 8);
// 	  // if (
// 	  // 	/\s/.test(password) ||
// 	  // 	!/[A-Z]/.test(password) ||
// 	  // 	!/\d/.test(password) ||
// 	  // 	!/[!@#$%^&*(),.?":{}|<>]/.test(password)
// 	  // ) {
// 	  // 	throw "ERR: invalid password";
// 	  // }
  
// 	  const usersCollection = await users();
// 	  const user = usersCollection.findOne({
// 		  username: lowercaseUsername,
// 	  });
// 	  if (!user) {
// 		  throw "Either the username or password is invalid";
// 	  }
// 	  const passwordMatch = bcrypt.compare(password, password);
// 	  if (!passwordMatch) {
// 		  throw "Either the username or password is invalid";
// 	  }
  
// 	  const newUser = await usersCollection.findOne(
// 		  { username: username },
// 		  { projection: { password: 0 } }
// 	  );
// 	  const {
// 		  firstName,
// 		  lastName,
// 	  email,
// 		  username: storedUsername,
// 		  role
// 	  } = newUser;
  
// 	  return {
// 		  firstName,
// 		  lastName,
// 	  email,
// 		  username: storedUsername,
// 		  role,
// 	  };
//   };

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
  
  export const remove = async (userId) => {
	  if(userId === undefined){
		throw 'id not provided';
	  } else if(typeof userId !== 'string' || userId.trim().length === 0){
		throw 'parameter is not a valid id';
	  } else if(!ObjectId.isValid(userId.trim())){
		throw 'id is not a valid ObjectID'
	  } 
	  const userCollection = await users();
	  const deletedUser = await userCollection.findOneAndDelete({
		_id: new ObjectId(userId)});
	
	  if (!deletedUser) {
		throw `Could not delete the product with id ${id}`;
	  }
	  return `${deletedUser.username} has been successfully deleted!`;
	};
  
   export const update = async (
	  firstName,
	  lastName,
	  email,
	  username,
	  password,
	  role
	) => {
  
	  let updatedUser = {
		  _id: _id,
		  firstName: firstName,
		  lastName: lastName,
		  email: email,
		  username: username,
		  password: password,
		  role: role
		  };
  
	  const userCollection = await users();
	  const updated = await userCollection.updateOne({_id: new ObjectId(_id)},  {$set: updatedUser});
	  if (!updated){
		throw 'could not update';
	  }
	  const updatedUserWithId = Object.assign({ _id: _id }, updatedUser);
  
	  return updatedUserWithId;
	};