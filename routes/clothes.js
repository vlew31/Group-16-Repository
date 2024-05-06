import express from 'express';
import { clothesData } from '../data/index.js'
import { listings } from '../config/mongoCollections.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  res.render('home', { title: '$waggle' });
});

router.route('/about').get(async (req, res) => {
  res.render('about', { title: 'Meet the Members' });
});

router.route('/mission').get(async (req, res) => {
  res.render('mission', { title: 'Our Mission' });
});

router.route('/user').get(async (req, res) => {
  res.render('user', { title: 'User Profile' });
});

router.route('/upload').get(async (req, res) => {
  res.render('upload', { title: 'Upload' });
});

router.route('/easteregg').get(async (req, res) => {
  res.render('easteregg', { title: 'Shhh' });
});

router.route('/listings/:listingId').get(async (req, res) => {
  const listingId = req.params.listingId;

  try {
    const listing = await clothesData.get(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listing', { listing, listingId }); // Pass listingId to the template
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.route('/cart').get(async (req, res) => {
  res.render('cart', { title: 'Cart/Wishlist' });
});

router.route('/search').get(async (req, res) => {
  res.render('search', { title: 'Search Results' });
});

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

router
  // .route('/listings/:listingsId')
  // .get(async (req, res) => {
  //   try {
  //     const clothes = await clothesData.get(req.params.clothesId);
  //     res.status(200).json(clothes);
  //   } catch (e) {
  //     if (e === 'Invalid ObjectId') {
  //       res.status(400).json({ error: 'Invalid clothes ID.' });
  //     } else {
  //       res.status(400).json({ error: e });
  //     }
  //   }
  // })
  .delete(async (req, res) => {
    try {
      const result = await clothesData.remove(req.params.listingsId);
      const deleted = !!result;
      res.status(200).json({ _id: req.params.clothesId, deleted: deleted });
    } catch (e) {
      if (e === 'Invalid ObjectId') {
        res.status(400).json({ error: 'Invalid listing ID.' });
      } else if (e === 'clothes not found') {
        res.status(404).json({ error: 'clothes not found.' });
      } else {
      return res.status(400).json({ error: e});
      }
    }
  })
  .put(async (req, res) => {
    let id = req.params.productId;
    let newListing = req.body;
    try {
      const updatedclothes = await clothesData.update(
        id,
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
      return res.json(updatedclothes);
    } catch (e) {
      if(e === 'Could not update clothes with provided id.'){
        res.status(404).json({error: 'clothes not found.'});
      }
      return res.status(400).send({error: e});
    }
  });

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

  // router.route('/searchclothes').post(async (req, res) => {
  //   //code here for POST this is where your form will be submitting searchclothessByName and then call your data function passing in the searchclothessByName and then rendering the search results of up to 20 clothess.
  
  //   try {
  //     const searchTerm = req.body.searchclothessByName;
  
  //     if (!searchTerm || searchTerm.trim() == '') {
  //       return res.status(400).render('error', { title: 'Error', error: 'Search term is required.' });
  //     }
  
  //     const page1 = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${searchTerm}&page=1`);
  //     const clothess1 = page1.data.Search || [];
  
  //     const page2 = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${searchTerm}&page=2`);
  //     const clothess2 = page2.data.Search || [];
  
  //     const clothess = clothess1.concat(clothess2);
  
  //     if (clothess.length === 0) {
  //       return res.status(404).render('error', { title: 'Error', error: `We're sorry, but no results were found for "${searchTerm}"` });
  //   }
  
  //     res.render('clothesSearchResults', { title: 'clothess Found', searchTerm, clothess });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  //   }
  // });
  
  
  router.route('/searchResults').post(async (req, res) => {
    //code here for POST this is where your form will be submitting searchByName and then call your data function passing in the searchByName and then rendering the search results.
  
    try {
      const searchTerm = req.body.searchByName;
  
      // if (!searchTerm || searchTerm.trim() === '') {
      //     return res.status(400).render('error', { title: 'Error', error: 'Search term is required.' });
      // }
      const filters = {
        size: Array.isArray(req.body.size) ? req.body.size : [req.body.size], // Convert to array if single value
        color: Array.isArray(req.body.color) ? req.body.color : [req.body.color],
        gender: Array.isArray(req.body.gender) ? req.body.gender : [req.body.gender],
        price: Array.isArray(req.body.price) ? req.body.price : [req.body.price],
        condition: Array.isArray(req.body.condition) ? req.body.condition : [req.body.condition]
    };
    console.log('Selected filters:', filters); 
    const searchResults = await clothesData.searchByName(searchTerm,filters);

      if (searchResults.length === 0) {
          return res.status(404).render('error', { title: 'Error', error: `We're sorry, but no results were found for "${searchTerm}"` });
      }
      res.render('searchResults', { title: 'Clothes Found', searchResults });
  } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
  }
});

export default router;