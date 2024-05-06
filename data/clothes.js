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

  // seller = seller.replace(/\s/g, ''); 
  seller = seller.trim();
  title = title.trim();
  description = description.trim();
  article = article.trim();
  size = size.trim();
  color = color.trim();
  gender = gender.trim();
  condition = condition.trim();
  tags = tags.trim();
  photos = photos.trim();
  
  if(typeof seller !== 'string' || seller.length <= 0  || typeof title !== 'string' || title.length <= 0  || 
  typeof description !== 'string' || description.length <= 0  || typeof article !== 'string' || article.length <= 0  || 
  typeof size !== 'string'|| size.length <= 0  || typeof color !== 'string' || color.length <= 0  ||  
  typeof gender !== 'string'|| gender.length <= 0  || typeof condition !== 'string' || condition.length <= 0  || 
  typeof tags !== 'string'|| tags.length <= 0  ||  typeof photos !=='string' || photos.length <= 0){
    throw("Must be a string type")
  }

  if (typeof price !== 'number' || price <= 0) {
    throw "Price must be a positive integer.";
  }
  const priceString = price.toString();
  if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
    throw "Invalid price.";
  }
  if (
    photos.substring(0, 10) !== "http://www" ||
    photos.substring(photos.length - 4) !== ".com" ||
    photos.length < 20
  ) {
    throw "Invalid photo.";
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
  // return { clothesCreated: true };
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
  //prints "undefined has been successfully deleted!"
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

  seller = seller.trim();
  title = title.trim();
  description = description.trim();
  article = article.trim();
  size = size.trim();
  color = color.trim();
  gender = gender.trim();
  condition = condition.trim();

  

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

  tags = tags.trim();
  photos = photos.trim();
  listingId.trim();
  
  if(typeof listingId !== 'string' || listingId.length <= 0 || typeof seller !== 'string' || seller.length <= 0  || typeof title !== 'string' || title.length <= 0  || 
  typeof description !== 'string' || description.length <= 0  || typeof article !== 'string' || article.length <= 0  || 
  typeof size !== 'string'|| size.length <= 0  || typeof color !== 'string' || color.length <= 0  ||  
  typeof gender !== 'string'|| gender.length <= 0  || typeof condition !== 'string' || condition.length <= 0  || 
  typeof tags !== 'string'|| tags.length <= 0  ||  typeof photos !=='string' || photos.length <= 0){
    throw("Must be a string type")
  }

  if (!ObjectId.isValid(listingId)) {
    throw "Invalid ObjectId.";
  }

  if (typeof price !== 'number' || price <= 0) {
    throw "Price must be a positive integer.";
  }
  const priceString = price.toString();
  if (priceString.includes(".") && priceString.split(".")[1].length > 2) {
    throw "Invalid price.";
  }

  const updateInfo = await clothesCollection.updateOne(
    { _id: new ObjectId(listingId) },
    { $set: updatedclothes },
    {returnDocument: 'after'}

  );

  if (updateInfo.modifiedCount === 0) {
    throw 'Could not update clothes with provided id.';
  }

  // const updatedclothesWithId = { _id: listingId, ...updatedclothes };
  if (!updateInfo) {
    throw 'could not update product successfully';
  }
  updateInfo._id = updateInfo._id.toString();

  return updateInfo;
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
    // const filterQuery = { title: { $regex: searchTerm,$options: 'i' } };
    // if (filters.size) {
    //   filterQuery.size = { $in: filters.size };
    // }
    // if (filters.color) {
    //   filterQuery.color = { $in: filters.color };
    // }
    // if (filters.gender) {
    //   filterQuery.gender = { $in: filters.gender };
    // }
    // if(filters.condition){
    //     filterQuery.condition = {$in: filters.condition};
    // }
    // if(filters.priceRange){
    //     filterQuery.priceRange = {$in: filters.priceRange};
    // }
    // console.log(filters.color[0]);
    // const searchResults = await clothesCollection.find({ title: { $regex: searchTerm, $options: 'i'} },{ color: { $regex: filters.color, $options: 'i'} }).toArray();
    // for(let i = 0;i<filters.color.length;i++){
    //   if()
    // }
    console.log(searchResults);
    return searchResults;
  } catch (error) {
    console.error('Error searching listings by name:', error);
    throw error;
  }
}