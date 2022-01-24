var express = require('express');
var router = express.Router();
const {categories,category,type, filter} = require('../controllers/categoriesController');

/* /api/filter/ */
router
    .get('/categories', categories)
    .get('/by/:type/:category', filter)
    .get('/categories/:id', category)
    .get('/types/:id', type)

module.exports = router;