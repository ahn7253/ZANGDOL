var express = require('express');
var router = express.Router();

router.get("/registration", function(_req,_res){
  _res.render('layout/main', { body:"../shelter/registration", csession:_req.csession });

});


module.exports = router;