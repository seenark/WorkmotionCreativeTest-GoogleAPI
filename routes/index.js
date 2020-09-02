const express = require('express');
const router = express.Router();

const controller = require('../controller/RestaurantController')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// GET Restaurant
router.get('/',controller.index)

module.exports = router;
