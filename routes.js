var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
  if (req.query.tkn != 123) {
    res.send('TKN INVALIDO');
  }else{
    next();
  }
});

router.post('*', function(req, res, next) {
  if (req.body.tkn != 1234) {
    res.send('TKN INVALIDO');
  }else{
    next();
  }
});

router.use('/api/root',require('./services/root'));
router.use('/api/item',require('./services/item'));

module.exports = router;
