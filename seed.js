// This file should set up the express server as shown in the lecture code
import { userData, clothesData } from "./data/index.js";

import { dbConnection } from "./config/mongoConnection.js";
//lets drop the database each time this is run

const db = await dbConnection();
await db.dropDatabase();

let User1 = undefined;
let User2 = undefined;
let User3 = undefined;
let User4 = undefined;
let User5 = undefined;


async function testRegisterUser(){
	try {
		User1 = await userData.registerUser(
			"Isabelle",
			"Villanueva",
			"ivillanu@stevens.edu",
			"ivillanu",
			"ivillanu123",
			"admin",
			// [],
			39.39
		);
	} catch(e) {
		console.log("Uh-oh, not supposed to see me");
		console.log(e);
	}
	try {
		User2 = await userData.registerUser(
			"Kieron",
			"Ampaw",
			"fake_email@gmail.com",
			"Keba12345", 
			"Keba1234",
			"admin",
			// [],
			1000
		);
	} catch(e) {
		console.log("Uh-oh, not supposed to see me");
		console.log(e);
	}
	try {
		User3 = await userData.registerUser(
			"Belal",
			"Eltemsah",
			"super_fake_email@gmail.com",
			"Belalipop", 
			"YeatLover",
			"admin",
			// [],
			4000
		);
	} catch(e) {
		console.log("Uh-oh, not supposed to see me");
		console.log(e);
	}
	try {
		User4 = await userData.registerUser(
			"isa",
			"villanu",
			"real_email@gmail.com",
			"Missbelly", 
			"BeaLover",
			"user",
			// [],
			200
		);
	} catch(e) {
		console.log("Uh-oh, not supposed to see me");
		console.log(e);
	}
	try {
		User5 = await userData.registerUser(
			"Bill",
			"Doors",
			"hotmail@gmail.com",
			"Richguy123", 
			"ImRichHaha",
			"user",
			// [],
			40000
		);
	} catch(e) {
		console.log("Uh-oh, not supposed to see me");
		console.log(e);
	}
}

//defining these here so I can use them later in the function
let fortniteMerch = undefined;
let beaMerch = undefined;
let cartiMerch = undefined;
let denimVest = undefined;
let starJorts = undefined;
let moonTee = undefined;

async function testCreateProducts() { //creates a listing
	try {
		fortniteMerch = await clothesData.create(
			"      missbelly     ",
			"fortnite merch",
			"limited edition fortnite nettspend collab",
			"hoodie",
			"XXS",
			"blue",
			"Unisex",
			49.99,
			"New",
			["Nettspend", "Underground", "Fortnite", "Merch"],
			["https://downersclub.com/wp-content/uploads/2023/11/Nettspend.jpg", "https://cdn1.epicgames.com/offer/fn/Blade_2560x1440_2560x1440-95718a8046a942675a0bc4d27560e2bb"]
			
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 1");
		console.log(e);
	}
	try {
		beaMerch = await clothesData.create(
			"belalipop",
			"beabadoobee merch",
			"I <3 BEABADOOBEE",
			"jorts",
			"XXL",
			"black",
			"F",
			19.91,
			"Refurbished",
			["Beabadoobee", "Singer", "Filipina", "Denim"],
			["https://i1.sndcdn.com/artworks-yi5PWVKO8kzMtSPc-tFa0hA-t240x240.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		cartiMerch = await clothesData.create(
			"keba123",
			"hello kitty mug",
			"playboi carti mug from EvilJ0rdan music video!",
			"accessories",
			"N/A",
			"white",
			"Unisex",
			20.24,
			"Used",
			["Hello Kitty", "Mug", "Playboi Carti", "Underground"],
			["https://m.media-amazon.com/images/I/61gT1oMuURL.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		starJorts = await clothesData.create(
			"vlew31",
			"Aelfric Eden Star Patchwork Jorts",
			"Jorts with star patchwork in the middle.",
			"Jorts",
			"30",
			"Blue",
			"Unisex",
			45.00,
			"New",
			["Denim", "Star"],
			["https://i.pinimg.com/564x/5f/aa/e4/5faae4bfc8bd71fc6b3a15b8e329d6a9.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		denimVest = await clothesData.create(
			"joelleAn",
			"Denim Vest",
			"Backless denim vest with denim ribbon",
			"Vest",
			"M",
			"blue",
			"F",
			90.00,
			"Refurbished",
			["Denim", "Ribbon", "Coquette", "Backless"],
			["https://i.pinimg.com/736x/37/a6/5e/37a65e3e2779a705216088f5511b9c78.jpg", "https://i.pinimg.com/564x/cc/e8/b5/cce8b5bc9d94193979a446d615d3828b.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		moonTee = await clothesData.create(
			"missbelly",
			"Trip to the Moon Mesh Tee",
			"Cropped tee with mesh fabric",
			"Tee",
			"S",
			"Other",
			"F",
			48.00,
			"New",
			["Mesh", "Moon", "Street Style"],
			["https://i.pinimg.com/736x/67/16/85/671685f5580e935b903519e96e892c94.jpg", "https://i.pinimg.com/736x/db/e4/51/dbe451c0af54a2bd40b2437a58b68487.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
}

await testCreateProducts();
await testRegisterUser();
// await testRemove();
// await testCreateReview();
// await testGetAllReview();
// await testGetReview();
// await testUpdateReview();
// await testRemoveReview();
// await closeConnection();
// console.log("Done!");