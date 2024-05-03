// This data file should export all functions using the ES6 standard as shown in the lecture code
import {listings} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

export const create = async (
  clothesName,
  clothesDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  if (!clothesName || !clothesDescription || !modelNumber || !price || !manufacturer || !manufacturerWebsite || !keywords || !categories || !dateReleased || discontinued === undefined) {
    throw "Must pass argument for every field.";
}

  clothesName = clothesName.trim();
  clothesDescription = clothesDescription.trim();
  modelNumber = modelNumber.trim();
  manufacturer = manufacturer.trim();
  manufacturerWebsite = manufacturerWebsite.trim();
  dateReleased = dateReleased.trim();

  if (
    typeof clothesName !== 'string' || clothesName === '' || 
    typeof clothesDescription !== 'string' || clothesDescription === '' || 
    typeof modelNumber !== 'string' || modelNumber === '' ||
    typeof manufacturer !== 'string' || manufacturer === '' ||
    typeof manufacturerWebsite !== 'string' || manufacturerWebsite === '' ||
    typeof dateReleased !== 'string' || dateReleased === ''){
      throw "All fields must be non-empty strings.";
  }

  if (typeof price !== 'number' || price <= 0) {
      throw "Price must be a number greater than 0";
  }

  const priceString = price.toString();
  if (priceString.includes('.') && priceString.split('.')[1].length > 2) {
    throw "Price cannot have more than two decimal places";
  }

  if(manufacturerWebsite.substring(0,10) != 'http://www' || manufacturerWebsite.substring(manufacturerWebsite.length - 4) != '.com'){
    throw "Invalid website format.";
  }

  if(manufacturerWebsite.length < 20){
    throw "Website cannot have less than 5 characters.";
  }

  if (!Array.isArray(keywords) || !Array.isArray(categories) || keywords.length === 0 || categories.length === 0 || !keywords.every(keyword => typeof keyword === 'string' && keyword.trim() !== '') || !categories.every(category => typeof category === 'string' && category.trim() !== '')) {
      throw "Invalid keyword or category format.";
  }

  const validDate = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!validDate.test(dateReleased)) {
      throw "Invalid date.";
  }

  const [month, day, year] = dateReleased.split('/').map(Number);

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
      throw "Invalid date.";
  }

  if (!Date.parse(`${month}/${day}/${year}`)) {
      throw "Invalid date.";
  }

  const releasedDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  if (releasedDate > currentDate) {
      throw "Invalid date.";
  }

  if (typeof discontinued !== 'boolean') {
      throw "Discontinued was not provided or is not a boolean.";
  }

  const clothessCollection = await listings();

  const newclothes = {
    clothesName: clothesName,
    clothesDescription: clothesDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued,
    reviews: [],
    averageRating: 0
  };

  const insertInfo = await clothessCollection.insertOne(newclothes);

  if (insertInfo.insertedCount === 0) {
      throw "Could not add clothes";
  }

  const newId = insertInfo.insertedId.toString();
  const clothes = await get(newId); 

  return clothes;
};

export const getAll = async () => {
  const clothessCollection = await listings();

  let clothesList = await clothessCollection
  .find({})
  .project({ _id: 1, clothesName: 1 })
  .toArray();

  if (!clothesList.length) throw 'No clothess found';

  return clothesList;
};

export const get = async (clothesId) => {
  let x = new ObjectId();
  if (!clothesId){
    throw 'Id must be provided';
  } 
  if (typeof clothesId !== 'string'){
    throw 'Id must be a string';
  }
  if (clothesId.trim().length === 0){
    throw 'Id cannot be an empty string or just spaces';
  }

  clothesId = clothesId.trim();
  if (!ObjectId.isValid(clothesId)){
    throw 'Invalid ObjectId';
  }

  const clothesCollection = await listings();
  const clothes = await clothesCollection.findOne({_id: new ObjectId(clothesId)});
  if (clothes === null) throw 'clothes not found';
  clothes._id = clothes._id.toString();
  return clothes;
};

export const remove = async (clothesId) => {
  if (!clothesId){
    throw 'clothes not found';
  } 
  if (typeof clothesId !== 'string'){
    throw 'Id must be a string';
  } 
  if (clothesId.trim().length === 0){
    throw 'id cannot be an empty string or just spaces';
  }

  clothesId = clothesId.trim();

  if (!ObjectId.isValid(clothesId)){
    throw 'Invalid ObjectId';
  } 

  const clothesCollection = await listings();
  const deletionInfo = await clothesCollection.findOneAndDelete({
    _id: new ObjectId(clothesId)
  });

  if (!deletionInfo) {
    throw `Could not delete clothes with id of ${clothesId}`;
  }

  return `${deletionInfo.clothesName} has been successfully deleted!`;
};

export const update = async (
  clothesId,
  clothesName,
  clothesDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  if (!clothesId || !clothesName || !clothesDescription || !modelNumber || !price || !manufacturer || !manufacturerWebsite || !keywords || !categories || !dateReleased || discontinued === undefined) {
    throw "Must provide values for all fields.";
  }

  clothesName = clothesName.trim();
  clothesDescription = clothesDescription.trim();
  modelNumber = modelNumber.trim();
  manufacturer = manufacturer.trim();
  manufacturerWebsite = manufacturerWebsite.trim();
  dateReleased = dateReleased.trim();

  if (
    typeof clothesId !== "string" ||
    typeof clothesName !== "string" || clothesName === '' ||
    typeof clothesDescription !== "string" || clothesDescription === '' ||
    typeof modelNumber !== "string" || modelNumber === '' ||
    typeof manufacturer !== "string" || manufacturer === '' ||
    typeof manufacturerWebsite !== "string" || manufacturerWebsite === '' ||
    typeof dateReleased !== "string" || dateReleased === ''
  ) {
    throw "All fields must be non-empty strings.";
  }

  if (!ObjectId.isValid(clothesId)) {
    throw "Invalid ObjectId.";
  }

  if (typeof price !== "number" || price <= 0) {
    throw "Price must be a number greater than 0.";
  }

  const priceString = price.toString();
  if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
    throw "Invalid price.";
  }

  if (
    manufacturerWebsite.substring(0, 10) !== "http://www" ||
    manufacturerWebsite.substring(manufacturerWebsite.length - 4) !== ".com" ||
    manufacturerWebsite.length < 20
  ) {
    throw "Invalid website.";
  }

  if (
    !Array.isArray(keywords) || !Array.isArray(categories) ||
    keywords.length === 0 || categories.length === 0 ||
    !keywords.every(keyword => typeof keyword === 'string' && keyword.trim() !== '') ||
    !categories.every(category => typeof category === 'string' && category.trim() !== '')
  ) {
    throw "Invalid keywords or categories format.";
  }

  const validDate = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!validDate.test(dateReleased)) {
    throw "Invalid date.";
  }

  const [month, day, year] = dateReleased.split('/').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth || !Date.parse(`${month}/${day}/${year}`)) {
    throw "Invalid date.";
  }

  if (typeof discontinued !== 'boolean') {
    throw "Discontinued must be a boolean value.";
  }

  const clothessCollection = await listings();
  const updatedclothes = {
    clothesName: clothesName,
    clothesDescription: clothesDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued,
  };

  const updateInfo = await clothessCollection.updateOne(
    { _id: new ObjectId(clothesId) },
    { $set: updatedclothes }
  );

  if (updateInfo.modifiedCount === 0) {
    throw 'Could not update clothes with provided id.';
  }

  const updatedclothesWithId = { _id: clothesId, ...updatedclothes };

  return updatedclothesWithId;
};
