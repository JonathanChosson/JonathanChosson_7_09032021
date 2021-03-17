//import des modules et fichiers complémentaires
const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth =require('../middleware/auth')
const multer = require('../middleware/multer-config-message');


//lier les routes au controllers
router.post('/createMessage', auth, multer, messageCtrl.createMessage); //C
router.get('/listMessage', auth, messageCtrl.listMessage);              //R
router.put('/likeUpdate', auth, messageCtrl.likeUpdate);                //U
router.put('/update', auth, multer, messageCtrl.update);                //U
router.delete('/delete', auth, messageCtrl.delete);                     //D

module.exports = router;