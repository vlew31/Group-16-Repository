// This data file should export all functions using the ES6 standard as shown in the lecture code
import {listings} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

export const create = async (
  seller,
  title,
  description,
  article,
  size,
  color,
  gender,
  price,
  condition,
  tags,
  photos
) => {
  if (!title || !description || !article || !size || !color || !gender || !price || !condition || !tags || !photos) {
    throw "Must pass argument for every field.";
}

  seller = seller.trim();
  title = title.trim();
  description = description.trim();
  article = article.trim();
  size = size.trim();
  color = color.trim();
  gender = gender.trim();
  condition = condition.trim();

  for (let i = 0; i < tags.length; i++) {
    tags[i] = tags[i].trim();
}
for (let i = 0; i < photos.length; i++) {
  photos[i] = photos[i].trim();
}  
  if( typeof seller !== 'string' || seller.length <= 0  || typeof title !== 'string' || title.length <= 0  ||
typeof description !== 'string' || description.length <= 0  || typeof article !== 'string' || article.length <= 0  ||
typeof size !== 'string'|| size.length <= 0  || tags.length <= 0  || photos.length <= 0){
  throw("Must be a string type")
} 
  const priceString = price.toString();
  if (priceString.includes(".") && priceString.split(".")[1].length > 2) {throw "Invalid price.";}

  for (let i = 0; i < photos.length; i++) {
    if (!photos[i].startsWith("https://")) {
      throw "Invalid photo URL. URLs must start with 'https://'.";
    }
  }

  const clothesCollection = await listings();

  const existingClothes = await clothesCollection.findOne({
    seller: seller,
    title: title,
    description: description,
    article: article,
    size: size,
    color: color,
    gender: gender,
    price: price,
    condition: condition,
    tags: tags,
    photos: photos
  });
  
  if (existingClothes) {
    throw "Clothes already exist";
  }

  const newclothes = {
    // userId: userId,
    seller: seller,
    title: title,
    description: description,
    article: article,
    size: size,
    color: color,
    gender: gender,
    price: price,
    condition: condition,
    tags: tags,
    photos: photos,
    comments: [],
    rating: 0
  };

  const insertInfo = await clothesCollection.insertOne(newclothes);

  if (insertInfo.insertedCount === 0) {
      throw "Could not add clothes";
  }

  const newId = insertInfo.insertedId.toString();
  const clothes = await get(newId); 

  return clothes;
};

export const getAll = async () => {
  const clothesCollection = await listings();

  let clothesList = await clothesCollection
  .find({})
  // .project({ _id: 1, clothesName: 1 })
  .toArray();

  if (!clothesList.length) throw 'No clothes found';

  return clothesList;
};

export const get = async (listingId) => {
  // let x = new ObjectId();
  // if (!listingId){
  //   throw 'Id must be provided';
  // } 
  // if (typeof listingId !== 'string'){
  //   throw 'Id must be a string';
  // }
  // if (listingId.trim().length === 0){
  //   throw 'Id cannot be an empty string or just spaces';
  // }

  listingId = listingId.trim();
  if (!ObjectId.isValid(listingId)){
    throw 'Invalid ObjectId';
  }

  const clothesCollection = await listings();
  const clothes = await clothesCollection.findOne({_id: new ObjectId(listingId)});
  if (clothes === null) throw 'clothes not found';
  clothes._id = clothes._id.toString();
  return clothes;
};

export const remove = async (listingId) => {
  if (!listingId){
    throw 'clothes not found';
  } 
  if (typeof listingId !== 'string'){
    throw 'Id must be a string';
  } 
  if (listingId.trim().length === 0){
    throw 'id cannot be an empty string or just spaces';
  }

  listingId = listingId.trim();

  if (!ObjectId.isValid(listingId)){
    throw 'Invalid ObjectId';
  } 

  const clothesCollection = await listings();
  const deletionInfo = await clothesCollection.findOneAndDelete({
    _id: new ObjectId(listingId)
  });

  if (!deletionInfo) {
    throw `Could not delete clothes with id of ${listingId}`;
  }

  return `${deletionInfo.clothesName} has been successfully deleted!`;
};

export const update = async (
  listingId,
  seller,
  title,
  description,
  article,
  size,
  color,
  gender,
  price,
  condition,
  tags,
  photos
) => {
  if (!listingId || !seller || !title || !description || !article || !size || !color || !gender || !price || !condition || !tags || !photos) {
    throw "Must provide values for all fields.";
  }
  if (!ObjectId.isValid(listingId)) throw 'invalid object ID';

  seller = seller.trim();
  title = title.trim();
  description = description.trim();
  article = article.trim();
  size = size.trim();
  color = color.trim();
  gender = gender.trim();
  condition = condition.trim();
  
  if(typeof title !== 'string' || typeof description !== 'string'
  || typeof article !== 'string' || typeof size !== 'string'|| typeof color !== 'string'
  ||typeof gender !== 'string'||typeof condition !== 'string' || typeof tags !== 'string'|| typeof photos !=='string'){
    throw("Must be a string type")
  }
  if (!Number.isInteger(price) || price <= 0) {
    throw "Price must be a positive integer.";
  }

  if (!ObjectId.isValid(listingId)) {
    throw "Invalid ObjectId.";
  }

  const priceString = price.toString();
  if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
    throw "Invalid price.";
  }

  if (
    photos.substring(0, 10) !== "http://www" ||
    photos.substring(manufacturerWebsite.length - 4) !== ".com" ||
    photos.length < 20
  ) {
    throw "Invalid website.";
  }

  const clothesCollection = await listings();
  const updatedclothes = {
    seller: seller,
    title: title,
    description: description,
    article: article,
    size: size,
    color: color,
    gender: gender,
    price: price,
    condition: condition,
    tags: tags,
    photos: photos
  };
  console.log(updatedclothes);
  const exist = await clothesCollection.findOne({_id: listingId});
  console.log(exist);
  const updateInfo = await clothesCollection.updateOne(
    { _id: new ObjectId(listingId) },
    { $set: updatedclothes },
  );
  console.log(updateInfo);
  if (updateInfo.modifiedCount === 0) {
    throw 'Could not update clothes with provided id.';
  }
  if (!updateInfo) {
    throw 'could not update product successfully';
  }
  const updatedclothesWithId = { _id: listingId, ...updatedclothes };
  return updatedclothes;
};

export async function searchByName(searchTerm,filters) {
  try {
    const priceString = filters.price.toString();
    if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
      throw "Invalid price.";
    }
    const clothesCollection = await listings();
    const searchResults = await clothesCollection.find({
      title: { $regex: searchTerm, $options: 'i' },
      size: { $in: filters.size.map(size => new RegExp(size, 'i')) },
      color: { $in: filters.color.map(color => new RegExp(color, 'i')) },
      condition: { $in: filters.condition.map(condition => new RegExp(condition, 'i')) }}).toArray();
    console.log(searchResults);
    return searchResults;
  } catch (error) {
    console.error('Error searching listings by name:', error);
    throw error;
  }
}
export async function addToCart(listingId, arr){
  const clothesCollection = await listings();
  const listingToAdd = await clothesCollection.findOne({_id: new ObjectId(listingId)});
  arr.push(listingToAdd);
  return arr;
}