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


async function testRegisterUser(){
	try {
		User1 = await userData.registerUser(
			"Isabelle",
			"Villanueva",
			"ivillanu@stevens.edu",
			"ivillanu",
			"ivillanu123",
			"ivillanu123",
			"admin"
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
			"Keba1234",
			"admin"
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
			"YeatLover",
			"admin"
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
			"BeaLover",
			"user"
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
let polo = undefined;
let cranberries = undefined; 
let baggyCoat = undefined;
let floralDress = undefined;
let floralTank = undefined;
let sneakers = undefined;
let redPants = undefined; 
let greenPJs = undefined;

async function testCreateProducts() { //creates a listing
	try {
		fortniteMerch = await clothesData.create(
			"      missbelly     ",
			"Fortnite Merch",
			"limited edition fortnite nettspend collab",
			"hoodie",
			"XXS",
			"Blue",
			"Unisex",
			49.99,
			"New",
			["Nettspend", "Underground", "Fortnite", "Merch"],
			["https://i.pinimg.com/564x/45/7a/9e/457a9e34639bf34422a0139fccf053d3.jpg", "https://cdn1.epicgames.com/offer/fn/Blade_2560x1440_2560x1440-95718a8046a942675a0bc4d27560e2bb"]
			
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 1");
		console.log(e);
	}
	try {
		beaMerch = await clothesData.create(
			"belalipop",
			"Beabadoobee Merch",
			"I <3 BEABADOOBEE",
			"jorts",
			"XXL",
			"Black",
			"Female",
			19.91,
			"Refurbished",
			["Beabadoobee", "Singer", "Filipina", "Denim"],
			["https://i.pinimg.com/564x/c3/86/20/c386207388e9fab69c7fcdf2dac84dca.jpg", "https://i1.sndcdn.com/artworks-yi5PWVKO8kzMtSPc-tFa0hA-t240x240.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		cartiMerch = await clothesData.create(
			"keba123",
			"Hello Kitty Mug",
			"playboi carti mug from EvilJ0rdan music video!",
			"accessories",
			"N/A",
			"White",
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
			"Blue",
			"Male",
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
			"Female",
			48.00,
			"New",
			["Mesh", "Moon", "Street Style"],
			["https://i.pinimg.com/736x/67/16/85/671685f5580e935b903519e96e892c94.jpg", "https://i.pinimg.com/736x/db/e4/51/dbe451c0af54a2bd40b2437a58b68487.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		polo = await clothesData.create(
			"missbelly",
			"Vintage Polo Ralph Lauren Equestrian Lined Denim Trucker Jacket",
			"This jacket is really comfortable and it's good for providing warmth.",
			"Jacket",
			"L",
			"Blue",
			"Unisex",
			199.99,
			"Used",
			["Equestrian", "Vintage", "Polo Ralph Lauren"],
			["https://i.pinimg.com/736x/21/b2/14/21b21472c6fa7e602d2eb484f5d7a011.jpg", "https://i.pinimg.com/736x/50/ff/86/50ff86cbffc2d142b1d2464b858008e1.jpg", "https://i.pinimg.com/736x/26/90/f9/2690f9c611e5894de62bfec8bfb5f1e8.jpg"]
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		cranberries = await clothesData.create(
			"belalipop",
			"Customized The Cranberries ",
			"Customized tee shirt of The Cranberries song, Linger!",
			"Tee",
			"Small",
			"White",
			"Female",
			12.73,
			"New",
			["Cranberries", "Customized", "Linger"],
			["https://i.pinimg.com/564x/fd/17/49/fd17493e93348aaca9fe07a3efaf852b.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		baggyCoat = await clothesData.create(
			"dominic39",
			"Jacket Men Vintage Baggy Coat",
			"Zip Up Outerwear Clothing Tops Male Retro Lapel",
			"Jacket",
			"XL",
			"Brown",
			"Male",
			49.99,
			"Used",
			["Retro", "Unbranded", "Collared"],
			["https://i.pinimg.com/564x/eb/db/12/ebdb1253323572e4769a9d1cf6827ae9.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		floralDress = await clothesData.create(
			"bealuver39",
			"Vintage Inspired Printed Collar Camisole Maxi Dress ",
			"Perfect for casual occasions and effortless style ",
			"Dress",
			"Medium",
			"Green",
			"Female",
			35.99,
			"Used",
			["Fisdy", "Floral", "Light"],
			["https://i.pinimg.com/736x/c9/54/1a/c9541af9705d6c6d3dfeeda185ed5d90.jpg", "https://i.pinimg.com/736x/97/4c/41/974c418ea7215d77a4abb7c34bc0381d.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		floralTank = await clothesData.create(
			"dominic39",
			"Floral Tank Top",
			"Girlfriend cheated on me and she left some of her stuff here so I'm breaking up with her.",
			"Tank Top",
			"Medium",
			"Green",
			"Female",
			10.12,
			"Used",
			["Olive Green", "Floral", "Embroidered"],
			["https://i.pinimg.com/564x/2c/68/06/2c6806616a065e8c4f9e6ad1e7820659.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		sneakers = await clothesData.create(
			"keba123",
			"Beige & Navy Shooting Star Sneakers",
			"Some cool sneakers I found at the thrift that I overgrew.",
			"Sneakers",
			"11",
			"Brown",
			"Male",
			50.00,
			"Used",
			["Star", "Beige", "Navy Blue"],
			["https://i.pinimg.com/736x/5c/b6/e5/5cb6e5e0fc56bbaa9f0d05ed87a11c67.jpg", "https://i.pinimg.com/736x/a8/7a/b2/a87ab23c738edfd41102c42e4dde8cf1.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		redPants = await clothesData.create(
			"joelleAn",
			"Red Bow Pants",
			"Cute red pants. Super comfy",
			"Pants",
			"16",
			"Red",
			"Female",
			32.16,
			"Used",
			["Ribbon", "corduroy"],
			["https://i.pinimg.com/564x/67/a4/e8/67a4e8b879eb507a11eec1b98e5592a6.jpg"] 
		);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 2");
		console.log(e);
	}
	try {
		greenPJs = await clothesData.create(
			"vic31",
			"Scalloped Pajama Set",
			"Metallic green with a plaid/floral design",
			"PJS",
			"Medium",
			"Green",
			"Female",
			17.89,
			"Used",
			["Green", "Pajama Set"],
			["https://i.pinimg.com/736x/d1/01/a8/d101a89716abdd6bc59578e7bfcee36d.jpg"] 
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