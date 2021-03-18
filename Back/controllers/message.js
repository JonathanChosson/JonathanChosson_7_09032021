//import des modules et fichiers complémentaires
const models = require('../models');
const fs = require('fs');

// Enregistrement de l'utilisateur /api/messages/createMessage
exports.createMessage = (req, res, next) => {
    nouvellesInfosMessage = JSON.parse(req.body.info);
    urlNouvelleImage = () => {
        if(!req.file){
            return nouvellesInfosMessage.photo = "https://loremflickr.com/320/240"
        }else{
            return nouvellesInfosMessage.photo = `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
        }
    }
    urlNouvelleImage();
    models.User.findOne({
        attributes: ['userName'],
        where: {id : nouvellesInfosMessage.userId}
    })
    .then(function(userFound){
            models.Message.create({
            title: nouvellesInfosMessage.title,
            content: nouvellesInfosMessage.content,
            attachment: nouvellesInfosMessage.photo,
            likes: 0,
            UserId: nouvellesInfosMessage.userId,
            createdBy: userFound.userName
        })
        .then((message) => res.status(201).json({ 'message': message }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })
};

// Retourne Liste de message /api/messages/listMessage/params
exports.listMessage = (req, res,  next) => {
        let userId = "";
    if (req.body.userId === undefined){
        userId = req.headers.userid;
    }else {
        userId = req.body.userId;
    }
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.headers.order;
    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' &&  fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit: null,
        offset: (!isNaN(offset)) ? offset : null,
    }).then((message) => {
            for (i in message){
            async function liked(){
                let reponse = await models.Like.findOne({
                where: {
                    userId: userId,
                    messageId:message[i].id
                }
            })
            if (reponse == null){

            }
            else{
                function messageLike(message) {
                    return message.id === reponse.dataValues.messageId;
                }
                let messageModif = message.find(messageLike);
                let messageModifed =  Object.defineProperty(messageModif.dataValues, "liked", {value: 1, writable : true, enumerable : true, configurable : true});
                message.splice(message.indexOf(messageModif), 1, messageModifed);
            }
                return message
            };
            liked();
        }
        setTimeout(function(){
            res.status(200).json({ 'message': message});
        }, 200);
    }).catch((err) => {
        res.status(500).json({ err });
    })
};

// Route like /api/message/likeUpdate
exports.likeUpdate = (req, res, next) => {

    if (req.body.messageId <= 0 || req.body.messageId == null ){
        return  res.status(400).json({'error': 'parametres invalide'})
    }
    
    async function messageFind(){
            let reponse = await models.Message.findOne({
            where: {id: req.body.messageId}
        });
            let data = await reponse;
            return data;
    };

    async function messageFindId(){
        let reponse = await models.Message.findOne({
        where: {id: req.body.messageId}
    });
        let data = await reponse.id;
        return data;
};

    async function userFind(){
        let reponse = await models.User.findOne({
        attributes: ['id'],
        where: {id: req.body.userId}
    });
        let data = await reponse.id;
        return data;
    };

    async function liked() {
        let userId = await userFind();
        let messageId = await messageFindId();
        let reponse = await models.Like.findOne({
            where: {
                userId: userId,
                messageId:messageId
            }
        })
        return reponse
    };

    async function majLiked(){
        likedResult = await liked();
        if (likedResult == null) {
        console.log('Ne like pas encore');
        let message = await messageFind();
        let user = await userFind();
        let messageId = await messageFindId();
        await message.addUser(user)
        .then((modif) => { 
            console.log(message.dataValues.likes);
            models.Message.update({
                likes: message.dataValues.likes +1
            },
                {where : {id : messageId}}
            )
            res.status(200).json({ 'modif': modif}); })
        .catch((err) => {res.status(500).json({ err });})
    }else{
        console.log('like déjà');
        let like = await liked();
        let message = await messageFind();
        let messageId = await messageFindId();
        like.destroy()
        .then((modif) => { 
            models.Message.update({
                likes : message.dataValues.likes -1
                },
                {where : {id : messageId}}
            )
            res.status(200).json({ 'modif': modif}); })
        .catch((err) => {res.status(500).json({ err });})
    }
    };
    majLiked();
};

// Route Update /api/messages/update
exports.update = (req, res ,next) => {
    nouvellesInfos = JSON.parse(req.body.info);
    models.Message.findOne({
        where: {id : nouvellesInfos.messageId}
    })
    .then(messageFind =>{
        console.log(messageFind.dataValues);
            let titleNew = nouvellesInfos.title ? nouvellesInfos.title : messageFind.dataValues.title ;
            let contentNew = nouvellesInfos.content ? nouvellesInfos.content : messageFind.dataValues.content;
            urlNouvelleImage = () => {
                if(!req.file){
                    return  messageFind.dataValues.attachment
                }else{
                    const filename = messageFind.dataValues.attachment.split('/images/messages/')[1];
                    fs.unlink(`images/messages/${filename}`, () => {});
                    return `${req.protocol}://${req.get('host')}/images/messages/${req.file.filename}`
                }
            }
            models.Message.update({
                title: titleNew,
                content : contentNew,
                attachment : urlNouvelleImage()
                },
                {where : {id : nouvellesInfos.messageId}}
            )
            .then(function(){
                    console.log('message Modifié');
                    res.status(201).json({ "message" : "Modification réussi" })
        
            })
            .catch(function(err){
                console.log('message non modifié');
                return res.status(501).json({ 'error': err});
            })
    })
    .catch(function(err){
        return res.status(500).json({ 'errorFind': err});
    })
}

// Route Delete /api/messages/delete
exports.delete = (req,res,next) =>{
    async function messageFind(){
        let reponse = await models.Message.findOne({
        where: {id: req.body.messageId}
    });
        let data = await reponse;
            return data;
    };

    async function destroy(){
        let messageFinded = await messageFind();
        if(messageFinded == null){
            res.status(404).json({ "Message": "Ce contenu n'existe plus" });
        }else{
            if (messageFinded.dataValues.UserId === req.body.userId){
            console.log(messageFinded.dataValues.attachment);
            const filename = messageFinded.dataValues.attachment.split('/images/messages/')[1];
            fs.unlink(`images/messages/${filename}`, () => {});
            messageFinded.destroy()
            res.status(200).json({ 'Suppression': "Message supprimé"});
        }else{
            res.status(403).json({ "Message": "Ce post ne vous appartiens pas" });
        }
        }
        
    };
    destroy()
}