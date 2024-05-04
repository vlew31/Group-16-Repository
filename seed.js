// This file should set up the express server as shown in the lecture code
import { userData, clothesData } from "./data/index.js";

import { dbConnection } from "./config/mongoConnection.js";
//lets drop the database each time this is run

const db = await dbConnection();
await db.dropDatabase();

//defining these here so I can use them later in the function
let apples = undefined;
let bananas = undefined;
let coconuts = undefined;
let donuts = undefined;

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
}

async function testRemove() {
	console.log("----------");
	console.log("Let's remove some Bananas!");
	if (bananas) {
		try {
			console.log(await clothesData.remove(bananas._id.toString()));
			console.log("Success! Removed the second product");
			console.log("-----------");
		} catch (e) {
			console.log("Uh-oh, not supposed to see me - 3");
			console.log(e);
		}
	} else {
		console.log("Bananas product creation failed");
	}
}
async function testUpdate() {
	console.log("Let's update some apples!");
	try {
		apples = await clothesData.update(
			apples._id.toString(),
			"Not Apples",
			"Keeps the WITCH away",
			"XY  Z123",
			3.01,
			"Lin Industries",
			"http://www.LININ.com",
			["Food", "Fruits"],
			["Delicious", "ASJDSD"],
			"03/20/2024",
			false
		);
		console.log("Success!, Apples has updated");
		console.log(await clothesData.get(apples._id.toString()));
		console.log("-----------");
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 4");
		console.log(e);
	}
}
async function testGetAll() {
	console.log(await clothesData.getAll());
}

async function testCreateReview() {
	try {
		rev1 = await reviewData.createReview(
			apples._id.toString(),
			"WOw",
			"me",
			"cool",
			3
		);
		// rev1 = reviewData.logfunction();
		console.log("Success!, Apples has been reviewed");
		console.log(await clothesData.get(apples._id.toString()));
		console.log("-----------");
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 5");
		console.log(e);
	}
}

async function testGetAllReview() {
	try {
		coconuts = await clothesData.create(
			"Coconuts",
			"Coconut crabs away",
			"XY  Z123",
			3.01,
			"Lin Industries",
			"http://www.LININ.com",
			["Food", "Fruits"],
			["Delicious", "ASJDSD"],
			"03/20/2024",
			false
		);
		const rev2 = await reviewData.createReview(
			coconuts._id.toString(),
			"COCONUT 1",
			"me",
			"cool",
			3.1
		);
		const rev3 = await reviewData.createReview(
			coconuts._id.toString(),
			"COCONUT 3",
			"me",
			"NOT COOL",
			3.2
		);
		// rev1 = reviewData.logfunction();
		console.log("Success!, Got both of the reviews of coconuts");
		console.log(await reviewData.getAllReviews(coconuts._id.toString()));
		console.log("-----------");
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 6");
		console.log(e);
	}
}

async function testGetReview() {
	try {
		coconuts = await clothesData.create(
			"Coconuts",
			"Coconut crabs away",
			"XY  Z123",
			3.01,
			"Lin Industries",
			"http://www.LININ.com",
			["Food", "Fruits"],
			["Delicious", "ASJDSD"],
			"03/20/2024",
			false
		);
		const rev2 = await reviewData.createReview(
			coconuts._id.toString(),
			"COCONUT 1",
			"me",
			"cool",
			3
		);
		// rev1 = reviewData.logfunction();
		console.log("Success!, Got a reviews of coconuts");
		let coco = await clothesData.get(coconuts._id.toString());
		const rev1_string = coco.reviews[0]._id.toString();
		console.log(rev1_string);
		console.log(await reviewData.getReview(rev1_string));
		// console.log(await reviewData.getReview(coconuts.reviews[0]));
		console.log("-----------");
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 7");
		console.log(e);
	}
}

async function testUpdateReview() {
	try {
		coconuts = await clothesData.create(
			"Coconuts",
			"Coconut crabs away",
			"XY  Z123",
			3.01,
			"Lin Industries",
			"http://www.LININ.com",
			["Food", "Fruits"],
			["Delicious", "ASJDSD"],
			"03/20/2024",
			false
		);
		//tests if rev2 has been updated - error test here
		const rev2 = await reviewData.createReview(
			coconuts._id.toString(),
			"COCONUT 1",
			"me",
			"cool",
			3
		);
		const rev3 = await reviewData.createReview(
			coconuts._id.toString(),
			"COCONUT awesome",
			"me",
			"cool",
			5
		);

		console.log("Success!, Got an updated reviews of coconuts");
		let coco = await clothesData.get(coconuts._id.toString());
		const rev1_string = coco.reviews[0]._id.toString();

		const updated = {
			title: "BAD COCONUT",
			reviewerName: "COCONUT HATER",
			review: "NOT COOL",
			rating: 1.3,
		};
		const a = await reviewData.updateReview(rev1_string, updated);
		console.log(await reviewData.getAllReviews(coconuts._id.toString()));
		console.log("-----------");
		console.log("updateReview printed correctly?:");
		console.log(a);
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 8");
		console.log(e);
	}
}
async function testRemoveReview() {
	try {
		donuts = await clothesData.create(
			"Donuts",
			"dodoodododo",
			"XY  Z123",
			3.01,
			"Lin Industries",
			"http://www.LININ.com",
			["Food", "Fruits"],
			["Delicious", "ASJDSD"],
			"03/20/2024",
			false
		);
		//tests if rev2 has been updated - error test here
		const rev2 = await reviewData.createReview(
			donuts._id.toString(),
			"DONUT FAN 123",
			"you",
			"eh",
			2
		);
		const rev3 = await reviewData.createReview(
			donuts._id.toString(),
			"DONUT FAN GGGGGG",
			"youuself",
			"he",
			4
		);
		const rev4 = await reviewData.createReview(
			donuts._id.toString(),
			"DONUT FAN ASDASDSD",
			"youuself",
			"he",
			1
		);
		let dodo = await clothesData.get(donuts._id.toString());
		const rev1_string = dodo.reviews[0]._id.toString();
		const a = await reviewData.removeReview(rev1_string);
		console.log("Success!, Removed a review from donuts");
		console.log(a);
		console.log("-----------");
	} catch (e) {
		console.log("Uh-oh, not supposed to see me - 9");
		console.log(e);
	}
}

await testCreateProducts();
// await testUpdate();
// await testRemove();
// await testCreateReview();
// await testGetAllReview();
// await testGetReview();
// await testUpdateReview();
// await testRemoveReview();
// await closeConnection();
// console.log("Done!");