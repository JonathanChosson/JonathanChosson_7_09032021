//import des modules et fichiers complémentaires
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth =require('../middleware/auth');
const multer = require('../middleware/multer-config-profil');

//lier les routes au controllers
router.post('/signup', userCtrl.signup);                            //C
router.get('/profil', auth, userCtrl.profil);                       //R
router.get('/allProfil', auth, userCtrl.allProfil);                 //R
router.post('/login', userCtrl.login);                              //R
router.put('/updateProfil', auth, multer, userCtrl.updateProfil);   //U
router.delete('/delete', auth, userCtrl.delete);                    //D


module.exports = router;