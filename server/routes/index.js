var express = require('express');
var router = express.Router();
var jepretgramcontroller  = require('../controllers/jepregram')
var auth                = require('../midleware/auth')
const {upload} = require('../midleware/upload.js');


/* GET home page. */
router.post('/register', jepretgramcontroller.register)
router.post('/signin', jepretgramcontroller.signin)
router.get('/checkjwt', auth.check, jepretgramcontroller.checkjwt)
router.get('/showgram',jepretgramcontroller.showgram)
router.post('/jepretgram',upload.single('picture'),jepretgramcontroller.jepretgram);


module.exports = router;
