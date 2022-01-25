var express = require('express');
var router = express.Router();
const {categories,category,type, filter} = require('../controllers/categoriesController');

/* /api/filter/ */
router
    .get('/categories', categories)
    .get('/types', type)
    .get('/by/:type/:category', filter)
    .get('/categories/:id', category)
    
module.exports = router;