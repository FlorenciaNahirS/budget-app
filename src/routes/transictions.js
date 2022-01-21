var express = require('express');
var router = express.Router();
const {total,latest,all,earnings,expenses,detail,create, update, destroy} = require('../controllers/transactionsController');

/* /api */
router
    .get('/total', total)
    .get('/latest', latest)
    .get('/all', all)
    .get('/earnings', earnings)
    .get('/expenses', expenses)
    .get('/detail/:id', detail)
    .post('/create' , create)
    .put('/update/:id', update)
    .delete('/delete/:id', destroy)

module.exports = router;
