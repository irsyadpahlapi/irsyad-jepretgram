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
router.put('/updategram/:id',jepretgramcontroller.updategram)
router.delete('/deletegram/:id',jepretgramcontroller.deletegram)
router.post('/jepretgram',upload.single('picture'),jepretgramcontroller.jepretgram);
router.post('/lovelike',jepretgramcontroller.lovelike)


module.exports = router;
