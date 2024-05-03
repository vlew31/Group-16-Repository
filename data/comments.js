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
    _id: newCommentID.toString(),
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

export const getAllComments = async (listingId) => {
  if(listingId === undefined){throw 'Please provide a valid listingId!';}

  listingId = listingId.trim();

  if(typeof(listingId) !== 'string'){throw 'Listing ID must be type string!';}

  if(listingId.length == 0){throw 'Listing ID cannot be an empty string!';}

  if (!ObjectId.isValid(listingId)) {throw "Invalid productId!";}

  const listingsCollection = await listings();
  let listing = await listingsCollection.findOne({_id: new ObjectId(listingId)});

  if(listing == undefined){throw 'No listings with the provided listingId exist!';}
  else if (listing.comments.length == 0 || !listing.comments){return [];}
  else{return listing.comments;}
};

export const getComment = async (commentId) => {
  if (commentId === undefined) {throw 'Please provide a commentId!';}

  commentId = commentId.trim();

  if (typeof(commentId) !== 'string') {throw 'Comment ID must be type string!';}

  if (commentId.length == 0) {throw 'Comment ID cannot be an empty string!';}

  if (!ObjectId.isValid(commentId)) {throw "Invalid commentId!";
  }

  const listingsCollection = await listings();
  const listing = await listingsCollection.findOne({
    "comments._id": commentId});

  if (!listing || !listing.comments) {throw 'Listing does not exist with given ID!';}

  const comment = listing.reviews.find(comment => comment._id.toString() === commentId);

  if (!comment) {throw 'Comment not found!';}

  return comment;
}; 


export const removeComment = async (commentId) => {
  if (commentId === undefined) { throw 'Please provide a valid commentId!'; }
  if (commentId.length === 0 || typeof(commentId) !== 'string') { throw 'XommentId must be a non-empty string!'; }
  if (!ObjectId.isValid(commentId)) { throw "Invalid commentId!"; }

  const listingsCollection = await listings();
  const listing = await listingsCollection.findOneAndUpdate(
    { 'comments._id': commentId },
    { $pull: { comments: { _id: commentId } } },
    { returnDocument: 'after' }
  );

  if (!listing) { throw 'Listing not found or review not present in listing.'; }

  if (!listing.comments || !Array.isArray(listing.comments)) {
    throw 'Listing comments are missing or invalid.';
  }
  
  return listing;
};

