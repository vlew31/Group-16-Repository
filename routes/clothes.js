import express from 'express';
import { clothesData } from '../data/index.js'
import { listings } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
router.use(express.json());

router.route('/').get(async (req, res) => {
  res.render('home', { title: '$waggle' });
});

router.route('/about').get(async (req, res) => {
  res.render('about', { title: 'About Us' });
});

router.route('/user').get(async (req, res) => {
  res.render('user', { title: 'User Profile' });
});

router.route('/upload').get(async (req, res) => {
  res.render('upload', { title: 'Upload' });
})
router.route('/update')
  .get(async (req, res) => {
    try {
      const { id, seller, title, description, article, size, color, gender, price, condition ,photos,tags} = req.body;
      console.log('update: get:\n'+id);
      const listing = await clothesData.get(listingId); 
      res.render('update', { title: 'Update Listing', listing }); 
    } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
    }
  })
  .post(async (req, res) => {
    try {
      const listing = req.body
      console.log('update: post:\n'+id);
      // console.log(updatedList);
      res.render('update', { title: 'Update Listing', listing }); 
  } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  }
  })
  .put(async (req, res) => {
    const { id, seller, title, description, article, size, color, gender, price, condition ,photos,tags} = req.body;
    console.log('update: put: \n'+id);
    let newListing = req.body;
    console.log('update: put: \n'+newListing)
    try {

      const updatedclothes = await clothesData.update(
        req.params_id,
        newListing.seller,
        newListing.title,
        newListing.description,
        newListing.article,
        newListing.size,
        newListing.color,
        newListing.gender,
        newListing.price,
        newListing.condition,
        newListing.tags,
        newListing.photos
      );
      res.render('update', { title: 'Update Listing', listing }); 
    } catch (e) {
      if(e === 'Could not update clothes with provided id.'){
        res.status(404).json({error: 'clothes not found.'});
      }
      return res.status(400).send({error: e});
    }
  });


router.route('/listing')
  .get(async (req, res) => {
    const { id, seller, title, description, article, size, color, gender, price, condition ,photos,tags} = req.body;
    const listing = await clothesData.get(id);
    res.render('listing', { title: 'Listing' },listing);
  })
  .post(async (req, res) => {
    try {
      const { id, seller, title, description, article, size, color, gender, price, condition ,photos,tags} = req.body;
      // const listing = {
      //   _id: new ObjectId(id),
      //   seller: seller,
      //   title: title,
      //   description: description,
      //   article: article,
      //   size: size,
      //   color: color,
      //   gender: gender,
      //   price: price,
      //   condition: condition,
      //   tags: tags,
      //   photos: photos,
      // };
      const listing = await clothesData.get(id);
      // console.log('listing:post:\n' +photos);
      res.render('listing', { title: 'Listing', listing});
  } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  }
  })
// .post(async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       article,
//       size,
//       color,
//       gender,
//       price,
//       condition,
//       tags,
//       photo
//   } = req.body;
//     const newclothes = await clothesData.create(
//       req.body.title,
//       req.body.description,
//       req.body.article,
//       req.body.size,
//       req.body.color,
//       req.body.gender,
//       req.body.price,
//       req.body.condition,
//       req.body.tags,
//       req.body.photo
//     );
//     // res.status(200).json(newclothes);
//     res.redirect('/');
//   } catch (e) {
//     return res.status(400).json({ error: e });
//   }
// });

// router.route('/listings/:listingId').get(async (req, res) => {
//   const listingId = req.params.listingId;

//   try {
//     const listing = await clothesData.get(listingId);
//     if (!listing) {
//       return res.status(404).send('Listing not found');
//     }
//     res.render('listing', { listing, listingId }); // Pass listingId to the template
//   } catch (err) {
//     console.error('Error fetching listing:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// router.route('/cart').get(async (req, res) => {
//   res.render('cart', { title: 'Cart/Wishlist' });
// });

// router.route('/search').get(async (req, res) => {
//   res.render('search', { title: 'Search Results' });
// });

router
  .route('/listings')
  .get(async (req, res) => {
    try {
      const clothes = await clothesData.getAll();
      return res.json(clothes);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try {
      const {
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
      } = req.body;

      let photoUrls = [];
      let tagArray = [];

      if (typeof photos === 'string' && photos.includes(',')) {
        photoUrls = photos.split(',');
      } else if (typeof photos === 'string') {
        photoUrls.push(photos);
      } else if (Array.isArray(photos)) {
        photoUrls = photos;
      }

      if (typeof tags === 'string' && tags.includes(',')) {
        tagArray = tags.split(',');
      } else if (typeof tags === 'string') {
        tagArray.push(tags);
      } else if (Array.isArray(tags)) {
        tagArray = tags;
      }

      const newclothes = await clothesData.create(
        seller,
        title,
        description,
        article,
        size,
        color,
        gender,
        price,
        condition,
        tagArray,
        photoUrls
      );
      return res.redirect('/'); 
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  
  });
// router
//   .route('/listings/:listingsId')
//   .get(async (req, res) => {
//     try {
//       const clothes = await clothesData.get(req.params.clothesId);
//       res.status(200).json(clothes);
//     } catch (e) {
//       if (e === 'Invalid ObjectId') {
//         res.status(400).json({ error: 'Invalid clothes ID.' });
//       } else {
//         res.status(400).json({ error: e });
//       }
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       const result = await clothesData.remove(req.params.clothesId);
//       const deleted = !!result;
//       res.status(200).json({ _id: req.params.clothesId, deleted: deleted });
//     } catch (e) {
//       if (e === 'Invalid ObjectId') {
//         res.status(400).json({ error: 'Invalid clothes ID.' });
//       } else if (e === 'clothes not found') {
//         res.status(404).json({ error: 'clothes not found.' });
//       } else {
//       return res.status(400).json({ error: e});
//       }
//     }
//   })
//   .put(async (req, res) => {
//     let id = req.params.productId;
//     let newListing = req.body;
//     try {
//       const updatedclothes = await clothesData.update(
//         id,
//         req.body.seller,
//         req.body.title,
//         req.body.description,
//         req.body.article,
//         req.body.size,
//         req.body.color,
//         req.body.gender,
//         req.body.price,
//         req.body.condition,
//         req.body.tags,
//         req.body.photos
//       );
//       return res.json(updatedclothes);
//     } catch (e) {
//       if(e === 'Could not update clothes with provided id.'){
//         res.status(404).json({error: 'clothes not found.'});
//       }
//       return res.status(400).send({error: e});
//     }
//   });

  // router.route('/listings/:_id').get(async (req, res) => {
  //   try {
  //     const clothesId = req.params._id;
  //     const response = await axios.get(`http://localhost:3000/listings/${clothesId}`);
  //     const clothes = response.data;
  
  //     if (clothes.Response === 'False') {
  //       return res.status(404).render('error', { title: 'Error', error: 'Clothes not found' });
  //     }
  
  //     res.render('clothesByID', { title: listings.Title, clothes });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  //   }
  // });
  
  
  router.route('/searchResults').post(async (req, res) => {
    //code here for POST this is where your form will be submitting searchByName and then call your data function passing in the searchByName and then rendering the search results.
  
    try {
      const searchTerm = req.body.searchByName;
      const filters = {
        size: Array.isArray(req.body.size) ? req.body.size : [req.body.size], // Convert to array if single value
        color: Array.isArray(req.body.color) ? req.body.color : [req.body.color],
        gender: Array.isArray(req.body.gender) ? req.body.gender : [req.body.gender],
        price: Array.isArray(req.body.price) ? req.body.price : [req.body.price],
        condition: Array.isArray(req.body.condition) ? req.body.condition : [req.body.condition]
    };
    const searchResults = await clothesData.searchByName(searchTerm,filters);
      console.log(searchResults)
      if (searchResults.length === 0) {
          return res.status(404).render('error', { title: 'Error', error: `We're sorry, but no results were found for "${searchTerm} or the selected filters"` });
      }
      res.render('searchResults', { title: 'Clothes Found', searchResults });
  } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  }
});

export default router;