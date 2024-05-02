import express from 'express';
const router = express.Router();
// import { searchClothesbyName, searchClothesByFilter } from "../data/clothes.js";
import axios from 'axios';

router.route('/').get(async (req, res) => {
  res.render('home', {title: "$waggle"});
});

router.route('/searchClothes').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  let clothes = req.body.searchClothesbyName;
  if (!clothes) {
    return res.status(404).render('error', {searchClothesbyName: clothes});
  } 
  const c = clothes.trim();
  if (c === '') {
    return res.status(404).render('error', {searchClothesbyName: clothes});
  }
  try {
    const result = await searchClothesbyName(c);
    res.render('clothesSearchResults', { clothes: c, result: c, title: "Clothes Found"});

  } catch (e) {
    return res.status(404).render('error', {searchClothesbyName: 'Clothes Not Found'});
  }
});

router.route('/clothes/:id').get(async (req, res) => {
  let i = req.params.id;
  try {
    i = i.trim();
    let clothes = await searchClothesByFilter(i);
    if (!i || i.length === 0) {
      return res.status(404).send(e);
    }
    return res.status(404).render('clothesByFilter', {clothes: i, title: "Clothes Found"});
  } catch (e) {
    return res.status(404).render('error', {searchClothesByFilter: i});
  }
});
router.route('/wishlist').get(async (req, res) => {
  
});
router.route('/rating').get(async (req, res) => {
  
});

export default router;
