//import des modules et fichiers complémentaires
const models = require('../models');

// Enregistrement de l'utilisateur /api/messages/createMessage
exports.createMessage = (req, res, next) => {
    models.User.findOne({
        attributes: ['userName'],
        where: {id : req.body.userId}
    })
    .then(function(userFound){
            models.Message.create({
            title: req.body.title,
            content: req.body.content,
            attachment: req.body.attachment,
            likes: 0,
            UserId: req.body.userId,
            createdBy: userFound.userName
        })
        .then((message) => res.status(201).json({ 'message': message }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(function(err){
        return res.status(500).json({ 'error': err});
    })


    
};

// Retourne Liste de message /api/messages/listMessage
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
    let order = req.query.order;
    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' &&  fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit: null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: models.User,
            attributes: ['userName']
        }],
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
        }, 1000);
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
    models.Message.update({
        title: req.body.title,
        content: req.body.content,
        attachment: req.body.attachment
        },
        {where : {id : req.body.messageId}}
    )
    .then(function(){
            console.log('message Modifié');
            res.status(201).json({ "message" : "Modification réussi" })

    })
    .catch(function(err){
        console.log('message non modifié');
        return res.status(500).json({ 'error': err});
    })
}

// Route Delete /api/messages/delete
exports.delete = (req,res,next) =>{
    console.log('Route Delete');
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
            messageFinded.destroy()
            res.status(200).json({ 'Suppression': "Message supprimé"});
        }else{
            res.status(403).json({ "Message": "Ce post ne vous appartiens pas" });
        }
        }
        
    };
    destroy()
}