var express = require('express');
var router = express.Router();
const {category,type, filter} = require('../controllers/categoriesController');

/* /api/filter/ */
router
    .get('/by', filter)
    .get('/categories/:id', category)
    .get('/types/:id', type)

module.exports = router;