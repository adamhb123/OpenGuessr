const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var passedVariable = req.query.image;
  console.log(passedVariable);
  res.render('editor', { title: 'CSHGuessr', panorama: "/images/panoramas/" + passedVariable});
});

module.exports = router;
