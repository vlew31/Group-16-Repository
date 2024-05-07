import express from 'express';
import { clothesData } from '../data/index.js'
import { listings } from '../config/mongoCollections.js';
import { update } from '../data/clothes.js';

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

router.route('/listing/:listingId').get(async (req, res) => {
  const listingId = req.params.listingId;

  try {
    const listing = await clothesData.get(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    // res.render('listing', { listing, listingId });
    res.render('listing', { title: listing.title, listing, listingId });
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.route('/update/:listingId')
.get(async (req, res) => {
  const listingId = req.params.listingId;

  try {
    const listing = await clothesData.get(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('update', { listing, listingId });
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(500).send('Internal Server Error');
  }
});
// .put(async (req, res) => {
//   try {
//     console.log(req.body);
//     const listingId = req.params.listingId;
//     const updatedListing = await clothesData.update(
//       listingId,
//       req.body.seller,
//       req.body.title,
//       req.body.description,
//       req.body.article,
//       req.body.size,
//       req.body.color,
//       req.body.gender,
//       req.body.price,
//       req.body.condition,
//       req.body.tags,
//       req.body.photos
//     );
//     return res.redirect('/');
//     // return res.json(updatedListing);
//   } catch (e) {
//     if(e === 'Could not update clothes with provided id.'){
//       res.status(404).json({error: 'clothes not found.'});
//     }
//     return res.status(400).send({error: e});
//   }
// });


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
      res.send(`<script>alert("${e || 'Invalid login. Please try again.'}"); window.location.href = "/upload";</script>`);
    }
  });


  // router.route('/listings/:listingId')
  // .post(async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const listingId = req.params.listingId;
  //     const updatedListing = await clothesData.update(
  //       listingId,
  //       req.body.seller,
  //       req.body.title,
  //       req.body.description,
  //       req.body.article,
  //       req.body.size,
  //       req.body.color,
  //       req.body.gender,
  //       req.body.price,
  //       req.body.condition,
  //       req.body.tags,
  //       req.body.photos
  //     );
  //     return res.redirect('/');
  //     // return res.json(updatedListing);
  //   } catch (e) {
  //     if(e === 'Could not update clothes with provided id.'){
  //       res.status(404).json({error: 'clothes not found.'});
  //     }
  //     return res.status(400).send({error: e});
  //   }
  // });

  router.route('/listings/:listingId')
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const listingId = req.params.listingId;
      
      let photoUrls = [];
      let tagArray = [];

      if (typeof req.body.photos === 'string' && req.body.photos.includes(',')) {
        photoUrls = req.body.photos.split(',');
      } else if (typeof req.body.photos === 'string') {
        photoUrls.push(req.body.photos);
      } else if (Array.isArray(req.body.photos)) {
        photoUrls = req.body.photos;
      }

      if (typeof req.body.tags === 'string' && req.body.tags.includes(',')) {
        tagArray = req.body.tags.split(',');
      } else if (typeof req.body.tags === 'string') {
        tagArray.push(req.body.tags);
      } else if (Array.isArray(req.body.tags)) {
        tagArray = req.body.tags;
      }

      const updatedListing = await clothesData.update(
        listingId,
        req.body.seller,
        req.body.title,
        req.body.description,
        req.body.article,
        req.body.size,
        req.body.color,
        req.body.gender,
        req.body.price,
        req.body.condition,
        tagArray,
        photoUrls
      );
      return res.redirect('/');
      // return res.json(updatedListing);
    } catch (e) {
      if(e === 'Could not update clothes with provided id.') {
        res.status(404).json({error: 'Clothes not found.'});
      }
      return res.status(400).send({error: e});
    }
  });


  router
  .route('/listings/:listingId')
  .get(async (req, res) => {
    try {
      const listingId = req.params.listingId;
      const listing = await clothesData.get(listingId);
      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      res.json(listing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }})
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
  });

// router
//   .delete(async (req, res) => {
//     try {
//       const result = await clothesData.remove(req.params.listingsId);
//       const deleted = !!result;
//       res.status(200).json({ _id: req.params.clothesId, deleted: deleted });
//     } catch (e) {
//       if (e === 'Invalid ObjectId') {
//         res.status(400).json({ error: 'Invalid listing ID.' });
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
//         req.params.clothesId,
//         req.body.clothesName,
//         req.body.clothesDescription,
//         req.body.modelNumber,
//         req.body.price,
//         req.body.manufacturer,
//         req.body.manufacturerWebsite,
//         req.body.keywords,
//         req.body.categories,
//         req.body.dateReleased,
//         req.body.discontinued
//       );
//       return res.json(updatedclothes);
//     } catch (e) {
//       if(e === 'Could not update clothes with provided id.'){
//         res.status(404).json({error: 'clothes not found.'});
//       }
//       return res.status(400).send({error: e});
//     }
//   });
  
  router.route('/searchResults').post(async (req, res) => {  
    try {
      const searchTerm = req.body.searchByName;
      const filters = {
        size: Array.isArray(req.body.size) ? req.body.size : [req.body.size],
        color: Array.isArray(req.body.color) ? req.body.color : [req.body.color],
        gender: Array.isArray(req.body.gender) ? req.body.gender : [req.body.gender],
        price: Array.isArray(req.body.price) ? req.body.price : [req.body.price],
        condition: Array.isArray(req.body.condition) ? req.body.condition : [req.body.condition]
    };
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



router.route('/update/:listingId')
.get(async (req, res) => {
  const listingId = req.params.listingId;

  try {
    const listing = await clothesData.get(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('update', { listing, listingId });
  } catch (err) {
    console.error('Error fetching listing:', err);
    res.status(500).send('Internal Server Error');
  }
})
.put(async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const updatedListing = await clothesData.update(
      listingId,
      req.body.seller,
      req.body.title,
      req.body.description,
      req.body.article,
      req.body.size,
      req.body.color,
      req.body.gender,
      req.body.price,
      req.body.condition,
      req.body.tags,
      req.body.photos
    );
    res.render('home', { title: '$waggle' });
  } catch (e) {
    res.render('home', { title: '$waggle' });
}});


router.route('/listings/:listingId')
  .put(async (req, res) => {
    try {
      const listingId = req.params.listingId;
      const updatedListing = await clothesData.update(
        listingId,
        req.body.seller,
        req.body.title,
        req.body.description,
        req.body.article,
        req.body.size,
        req.body.color,
        req.body.gender,
        req.body.price,
        req.body.condition,
        req.body.tags,
        req.body.photos
      );
      return res.json(updatedListing);
    } catch (e) {
      if(e === 'Could not update clothes with provided id.'){
        res.status(404).json({error: 'clothes not found.'});
      }
      return res.status(400).send({error: e});
    }
  })

  router
  .route('/listings/:listingId')
  .get(async (req, res) => {
    try {
      const listingId = req.params.listingId;
      const listing = await clothesData.get(listingId);
      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
      res.json(listing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }})
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
  });

export default router;