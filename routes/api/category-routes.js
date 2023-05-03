const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//This get finds all categories and includes their associated products
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

//This get returns a specific category with its associated Product data
router.get('/:id', async(req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if(!categoryData){
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
