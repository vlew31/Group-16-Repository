// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
// import validUrl from "valid-url";
import { users } from "../config/mongoCollections.js";
export {
	stringTrimmer,
	checkIsProperString,
	checkIsProperLength,
	checkRequiredFields,
	checkIfFieldsAreProperString,
	checkPrice,
	checkIsProperWebsite,
	checkIsProperArray,
	checkIsProperDate,
	checkString,
	checkIsProperRating,
	checkIfContainsNumber,
	checkMaxLength,
};

const checkIsProperRating = (rating) => {
	if (
		typeof rating !== "number" ||
		rating < 1 ||
		rating > 5 ||
		!/^\d+(\.\d{1})?$/.test(rating.toString())
	) {
		throw new Error(
			"Rating must be a number between 1 and 5 with at most one decimal place"
		);
	}
};
const stringTrimmer = (str) => {
	if ((!str && str !== "") || typeof str !== "string") {
		throw "Input is not a String";
	}
	return str.trim();
};

const checkIsProperString = async (str, variableName) => {
	if (!str && str !== "") {
		throw `ERR: ${variableName || "Provided Variable"} is not a string`;
	}
	if (typeof str !== "string" && !(str instanceof String)) {
		throw `ERR: ${variableName || "Provided Variable"} is not an string`;
	}
};

const checkIsProperLength = (str, len, variableName) => {
	if (str.length < len) {
		throw `ERR: ${
			variableName || "Provided Variable"
		} cannot be empty strings`;
	}
};
const checkMaxLength = (str, len, variableName) => {
	if (str.length > len) {
		throw `ERR: ${
			variableName || "Provided Variable"
		} cannot be empty strings`;
	}
};

const checkIfContainsNumber = (str) => {
	if (/\d/.test(str)) {
		throw "ERR: String cannot contain number";
	}
};

const checkRequiredFields = (...fields) => {
	for (const field of fields) {
		if (
			field === undefined ||
			field === null ||
			Number.isNaN(field) ||
			!(
				typeof field === "string" ||
				typeof field === "number" ||
				typeof field === "boolean" ||
				Array.isArray(field)
			)
		) {
			throw "All fields need to be supplied";
		}
	}
};

const checkString = (strVal, varName) => {
	if (!strVal) throw `Error: You must supply a ${varName}!`;
	if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
	strVal = strVal.trim();
	if (strVal.length === 0)
		throw `Error: ${varName} cannot be an empty string or string with just spaces`;
	if (!isNaN(strVal))
		throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
	return strVal;
};

const checkIfFieldsAreProperString = (...fields) => {
	for (let i = 0; i < fields.length; i++) {
		const check = stringTrimmer(fields[i]);
		fields[i] = check;
		checkIsProperString(check);
		checkIsProperLength(check, 1);
	}
};
const checkPrice = (price) => {
	if (
		typeof price !== "number" ||
		price <= 0 ||
		!/^\d+(\.\d{1,2})?$/.test(price.toString())
	) {
		throw "Price is not proper";
	}
};
const checkIsProperWebsite = (manufacturerWebsite) => {
	if (validUrl.isUri(manufacturerWebsite)) {
	} else {
		throw "website does not meet criteria";
	}
	const websiteRegex = /^http:\/\/www\..{5,}\.com$/;
	if (!websiteRegex.test(manufacturerWebsite)) {
		throw "website does not meet criteria";
	}
};
const checkIsProperArray = (arr) => {
	if (!Array.isArray(arr) || arr.length === 0) {
		throw "Array must be non empty";
	}
	for (let i = 0; i < arr.length; i++) {
		arr[i] = stringTrimmer(arr[i]);
		checkIsProperString(arr[i]);
		checkIsProperLength(arr[i], 1);
	}
};
