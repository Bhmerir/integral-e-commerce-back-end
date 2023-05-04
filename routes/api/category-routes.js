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

router.post('/', async(req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    let categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const categoryData = await Category.destroy(
    {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



