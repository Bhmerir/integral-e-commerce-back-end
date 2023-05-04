const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//This get returns all tags with their associated Product data
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

//This get returns a specific tag with its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model:Product }]
    });

    if(!tagData){
      res.status(404).json({message: "No tag found with that id!"});
      return;
    }

    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
