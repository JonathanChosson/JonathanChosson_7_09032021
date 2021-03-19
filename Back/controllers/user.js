//import des modules et fichiers complémentaires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');

// Enregistrement de l'utilisateur /api/auth/signup
exports.signup = (req, res, next) => {
    models.User.findOne({
        attributes: ['email'],
        where: {email : req.body.email}
    })
    .then(function(userFound){
        if (!userFound){
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email))
            {
                bcrypt.hash(req.body.password, 10)
            .then(hash => {
                    const user = models.User.create({
                    email: req.body.email,
                    userName: req.body.userName,
                    password: hash,
                    bio: req.body.bio,
                    isAdmin: 0,
                    photo:""
                    })
                    .then((user) => res.status(201).json({ 'message': "utilisateur créee" }))
                    .catch(error => res.status(400).json({ error }));
            })
            }else{
                return res.status(409).json({'erreur': 'Adresse Mail incorecte'})
            }
            
        }else{
            return res.status(409).json({'erreur': 'utilisateur déjà existant'})
        }
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })
};

// Route login /api/auth/login
exports.login = (req,res,next) => {
    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({'error': 'Champs obligatoire vide'})
    }
    models.User.findOne({
        where: {email : req.body.email}
        })
    .then(user =>{
        if (!user) {
            return res.status(401).json({error : 'Utilisateur non trouvé !'});
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({error : 'Mot de passe incorrect !'});
                }else {
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId : user.id, isAdmin: user.isAdmin},
                            process.env.TOKEN_JWT,
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(501).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}));
}; 

// Route profil /api/auth/profil
exports.profil = (req, res, next) => {
    let userId = "";
    if (req.body.userId === undefined){
        userId = req.headers.userid;
    }else {
        userId = req.body.userId;
    }
    models.User.findOne({
        attributes: ['id','email', 'userName', 'bio', 'photo','isAdmin'],
        where: {id : userId}
    })
    .then(user =>{
        if (!user) {
            return res.status(401).json({error : 'Utilisateur non trouvé !'});
        }
        else{
            res.status(200).json({ user });
        }
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })
};

// Route profil /api/auth/allProfil
exports.allProfil = (req, res, next) => {
    models.User.findAll({
        attributes: ['id', 'userName', 'photo'],
    })
    .then(user =>{
        if (!user) {
            return res.status(401).json({error : 'Utilisateur non trouvé !'});
        }
        else{
            res.status(200).json({ user });
        }
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })
};

// Route updateProfil /api/auth/updateProfil
exports.updateProfil = (req, res, next) => {
    nouvellesInfos = JSON.parse(req.body.info);
    urlNouvelleImage = () => {
        if(!req.file){
            return nouvellesInfos.photo
        }else{
            const filename = nouvellesInfos.photo.split('/images/profil/')[1];
            fs.unlink(`images/profil/${filename}`, () => {});
            return `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}`
        }
    }
    // req.file ? `${req.protocol}://${req.get('host')}/images/profil/${req.file.filename}` : nouvellesInfos.photo;
    models.User.update({
        bio: nouvellesInfos.bio,
        userName: nouvellesInfos.userName,
        photo: urlNouvelleImage() ,
        },
        {where : {id : req.headers.userid}}
    )
    .then(function(userId){
            models.User.findOne({
                attributes: ['userName','bio'],
                where: {id : userId}
                })
            .then(user =>{
            res.status(201).json({ user })
            })
            .catch(error => res.status(501).json({error}))
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })
};

// route delete User /api/auth/delete
exports.delete = (req,res,next) =>{
    async function userFind(){
        let reponse = await models.User.findOne({
        where: {id: req.body.userId}
    });
        let data = await reponse;
            return data;
    };

    async function destroy(){
        let userFinded = await userFind();
        if(userFinded == null){
            res.status(404).json({ "Message": "Cet utilisateur n'existe plus" });
        }else{
            if (userFinded.dataValues.id === req.body.userId){
                const filename = userFinded.dataValues.photo.split('/images/profil/')[1];
            fs.unlink(`images/profil/${filename}`, () => {});
            userFinded.destroy()
            res.status(200).json({ 'Suppression': "Utilisateur supprimé"});
            }else{
            res.status(403).json({ "Message": "Vous n'etes pas en droit de faire ceci" });
            }
        }
        
    };
    destroy()
}