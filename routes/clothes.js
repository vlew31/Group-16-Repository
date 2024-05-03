import express from 'express';
import { clothesData } from '../data/index.js'

const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home', { title: '$waggle' });
});

router.route('/about').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('about', { title: 'About Us' });
});

router.route('/home').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home', { title: 'Home' });
});

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

  router.route('/searchclothes').post(async (req, res) => {
    //code here for POST this is where your form will be submitting searchclothessByName and then call your data function passing in the searchclothessByName and then rendering the search results of up to 20 clothess.
  
    try {
      const searchTerm = req.body.searchclothessByName;
  
      if (!searchTerm || searchTerm.trim() == '') {
        return res.status(400).render('error', { title: 'Error', error: 'Search term is required.' });
      }
  
      const page1 = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${searchTerm}&page=1`);
      const clothess1 = page1.data.Search || [];
  
      const page2 = await axios.get(`http://www.omdbapi.com/?apikey=CS546&s=${searchTerm}&page=2`);
      const clothess2 = page2.data.Search || [];
  
      const clothess = clothess1.concat(clothess2);
  
      if (clothess.length === 0) {
        return res.status(404).render('error', { title: 'Error', error: `We're sorry, but no results were found for "${searchTerm}"` });
    }
  
      res.render('clothesSearchResults', { title: 'clothess Found', searchTerm, clothess });
    } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
    }
  });
  
  router.route('/clothes/:id').get(async (req, res) => {
    //code here for GET a single clothes
    try {
      const clothesId = req.params.id;
      const response = await axios.get(`http://www.omdbapi.com/?apikey=CS546&i=${clothesId}`);
      const clothes = response.data;
  
      if (clothes.Response === 'False') {
        return res.status(404).render('error', { title: 'Error', error: 'clothes not found' });
      }
  
      res.render('clothesByID', { title: clothes.Title, clothes });
    } catch (error) {
      console.log(error);
      res.status(500).render('error', { title: 'Error', error: 'Server Error' });
    }
  });
  

export default router;