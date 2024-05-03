import {listings} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

export const createComment = async (
  userId, //ObjectId
  username, //string
  listingId, //ObjectId
  comment, //string
  commentId //ObjectId
) => {

  if(userId === undefined || username == undefined || listingId === undefined || comment === undefined || commentId === undefined){throw 'All fields need to have valid values!';}

  username = username.trim();
  comment = comment.trim();

  if(typeof(username) !== 'string' || typeof(comment) !== 'string'){'Certain fields must be strings!';}

  if (!ObjectId.isValid(userId)) {throw "Invalid userId!";}
  if (!ObjectId.isValid(listingId)) {throw "Invalid listingId!";}
  if (!ObjectId.isValid(commentId)) {throw "Invalid commentId!";}

  const listingsCollection = await listings();
  const listing = await listingsCollection.findOne({_id: new ObjectId(listingId)});
  if (!listing) throw 'Error: Listing not found!';

  const newCommentID = new ObjectId();
  let newComment = {
    userId: userId,
    username: username,
    listingId: listingId,
    comment: comment,
    commentId: newCommentID.toString(),
  };

  listing.comments.push(newComment);

  const updatedProduct = await productCollection.updateOne(
    {_id: new ObjectId(listingId)},
    {$set: { comments: listing.comments }}
  );

  //const products = await get(productId);
  //const averageRating = products
   
  return newComment; 
};

// export const getAllReviews = async (productId) => {
//   if(productId === undefined){throw 'Please provide a valid productId!';}

//   productId = productId.trim();

//   if(typeof(productId) !== 'string'){throw 'Product ID must be type string!';}

//   if(productId.length == 0){throw 'Product ID cannot be an empty string!';}

//   if (!ObjectId.isValid(productId)) {throw "Invalid productId!";}

//   const productCollection = await products();
//   let product = await productCollection.findOne({_id: new ObjectId(productId)});

//   if(product == undefined){throw 'No products with the provided productId exist!';}
//   else if (product.reviews.length == 0 || !product.reviews){return [];}
//   else{return product.reviews;}
// };

// export const getReview = async (reviewId) => {
//   if (reviewId === undefined) {throw 'Please provide a reviewId!';}

//   reviewId = reviewId.trim();

//   if (typeof(reviewId) !== 'string') {throw 'Review ID must be type string!';}

//   if (reviewId.length == 0) {throw 'Review ID cannot be an empty string!';}

//   if (!ObjectId.isValid(reviewId)) {throw "Invalid reviewId!";
//   }

//   const productCollection = await products();
//   const product = await productCollection.findOne({
//     "reviews._id": reviewId});

//   if (!product || !product.reviews) {throw 'Product does not exist with given ID!';}

//   const review = product.reviews.find(review => review._id.toString() === reviewId);

//   if (!review) {throw 'Review not found!';}

//   return review;
// }; 


// export const updateReview = async (reviewId, updateObject) => {
//   if(reviewId === undefined){throw 'Please provide a reviewId!'}

//   reviewId = reviewId.trim();

//   if(typeof(reviewId) !== 'string'){throw 'Review ID must be type string!';}

//   if(reviewId.length == 0){throw 'Review ID cannot be an empty string!';}

//   if (!ObjectId.isValid(reviewId)) {throw "Invalid reviewId!";}

//   if(updateObject === undefined || typeof(updateObject) !== 'object'){throw 'updateObject is not provided!';}

//   updateObject.title = updateObject.title.trim();
//   updateObject.reviewerName = updateObject.reviewerName.trim();
//   updateObject.review = updateObject.review.trim();

//   if(typeof(updateObject.title) !== 'string'|| typeof(updateObject.reviewerName) !== 'string' || typeof(updateObject.review) !== 'string'){throw 'Certain fields must be of type string!';}

//   if(updateObject.title.length === 0 || updateObject.reviewerName.length === 0 || updateObject.review.length === 0){throw 'Title, Reviewer Name, and Review cannot be an empty field!';}


//   if(typeof(updateObject.rating) !== 'number' || updateObject.rating === undefined || updateObject.rating < 1 || updateObject.rating > 5 || (updateObject.rating.toString().split('.')[1] || '').length > 1){throw 'Rating should be between 1-5 and a maximum of one decimal place!';}

//   const productCollection = await products();
//   const product = await productCollection.findOne({"reviews._id": reviewId });

//   if (product === undefined || !product.reviews || product.reviews.length === 0){throw 'Product does not exist with given ID!';}
  
//   const updatedFields = {};
//   if ('title' in updateObject) {updatedFields['reviews.$.title'] = updateObject.title;}
//   if ('reviewerName' in updateObject) {updatedFields['reviews.$.reviewerName'] = updateObject.reviewerName;}
//   if ('review' in updateObject) {updatedFields['reviews.$.review'] = updateObject.review;}
//   if ('rating' in updateObject) {updatedFields['reviews.$.rating'] = updateObject.rating;}

//   let currentDate = new Date();
//   updatedFields['reviews.$.reviewDate'] = currentDate.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'});

//   await productCollection.updateOne(
//     {'reviews._id': reviewId},
//     {$set: updatedFields}
//   );

//   const updatedProduct = await productCollection.findOne({'reviews._id': reviewId});
//   const totalRatings = updatedProduct.reviews.reduce((acc, curr) => acc + curr.rating, 0);
//   if (updatedProduct.reviews.length > 0) {
//     updatedProduct.averageRating = totalRatings / updatedProduct.reviews.length;
//   } else {
//     updatedProduct.averageRating = 0;
//   }
//   await productCollection.updateOne(
//     { _id: updatedProduct._id },
//     { $set: { averageRating: updatedProduct.averageRating} }
//   );

//   return updatedProduct;

// };

// export const removeReview = async (reviewId) => {
//   if (reviewId === undefined) { throw 'Please provide a valid reviewID!'; }
//   if (reviewId.length === 0 || typeof(reviewId) !== 'string') { throw 'ReviewID must be a non-empty string!'; }
//   if (!ObjectId.isValid(reviewId)) { throw "Invalid reviewId!"; }

//   const productCollection = await products();
//   const product = await productCollection.findOneAndUpdate(
//     { 'reviews._id': reviewId },
//     { $pull: { reviews: { _id: reviewId } } },
//     { returnDocument: 'after' }
//   );

//   if (!product) { throw 'Product not found or review not present in product.'; }

//   if (!product.reviews || !Array.isArray(product.reviews)) {
//     throw 'Product reviews are missing or invalid.';
//   }

//   const totalRatings = product.reviews.reduce((acc, curr) => acc + curr.rating, 0);

//   product.averageRating = totalRatings / product.reviews.length;

//   await productCollection.updateOne(
//     { _id: product._id },
//     { $set: { averageRating: product.averageRating} }
//   );
  
//   return product;
// };

