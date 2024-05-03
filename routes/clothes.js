// import express from 'express';
// const router = express.Router();
// // import { searchClothesbyName, searchClothesByFilter } from "../data/clothes.js";
// import axios from 'axios';

// router.route('/').get(async (req, res) => {
//   res.render('home', {title: "Swaggle"});
// });

// router.route('/searchClothes').post(async (req, res) => {
//   //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
//   let clothes = req.body.searchClothesbyName;
//   if (!clothes) {
//     return res.status(404).render('error', {searchClothesbyName: clothes});
//   } 
//   const c = clothes.trim();
//   if (c === '') {
//     return res.status(404).render('error', {searchClothesbyName: clothes});
//   }
//   try {
//     const result = await searchClothesbyName(c);
//     res.render('clothesSearchResults', { clothes: c, result: c, title: "Clothes Found"});

//   } catch (e) {
//     return res.status(404).render('error', {searchClothesbyName: 'Clothes Not Found'});
//   }
// });

// router.route('/clothes/:id').get(async (req, res) => {
//   let i = req.params.id;
//   try {
//     i = i.trim();
//     let clothes = await searchClothesByFilter(i);
//     if (!i || i.length === 0) {
//       return res.status(404).send(e);
//     }
//     return res.status(404).render('clothesByFilter', {clothes: i, title: "Clothes Found"});
//   } catch (e) {
//     return res.status(404).render('error', {searchClothesByFilter: i});
//   }
// });
// router.route('/wishlist').get(async (req, res) => {
  
// });
// router.route('/rating').get(async (req, res) => {
  
// });

// export default router;

// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import express from 'express';
import { clothesData } from '../data/index.js'

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const clothess = await clothesData.getAll();
      return res.json(clothess);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try {
      const {
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
      } = req.body;
      const newclothes = await clothesData.create(
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
      );
      res.status(200).json(newclothes);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  });

router
  .route('/:clothesId')
  .get(async (req, res) => {
    try {
      const clothes = await clothesData.get(req.params.clothesId);
      res.status(200).json(clothes);
    } catch (e) {
      if (e === 'Invalid ObjectId') {
        res.status(400).json({ error: 'Invalid clothes ID.' });
      } else if (e === 'clothes not found') {
        res.status(404).json({ error: 'clothes not found.' });
      } else {
        res.status(400).json({ error: e });
      }
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await clothesData.remove(req.params.clothesId);
      const deleted = !!result;
      res.status(200).json({ _id: req.params.clothesId, deleted: deleted });
    } catch (e) {
      if (e === 'Invalid ObjectId') {
        res.status(400).json({ error: 'Invalid clothes ID.' });
      } else if (e === 'clothes not found') {
        res.status(404).json({ error: 'clothes not found.' });
      } else {
      return res.status(400).json({ error: e});
      }
    }
  })
  .put(async (req, res) => {
    try {
      const updatedclothes = await clothesData.update(
        req.params.clothesId,
        req.body.clothesName,
        req.body.clothesDescription,
        req.body.modelNumber,
        req.body.price,
        req.body.manufacturer,
        req.body.manufacturerWebsite,
        req.body.keywords,
        req.body.categories,
        req.body.dateReleased,
        req.body.discontinued
      );
      return res.status(200).json(updatedclothes);
    } catch (e) {
      if(e === 'Could not update clothes with provided id.'){
        res.status(404).json({error: 'clothes not found.'});
      }
      return res.status(400).send({error: e});
    }
  });

export default router;