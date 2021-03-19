const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let userIn = "";
if (req.body.userId === undefined){
    userIn = req.headers.userid;
}else {
    userIn = req.body.userId;
}
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
        const userId = decodedToken.userId;
    if (userIn != userId) {
        throw 'Invalid user ID';
    } else {
        next();
    }
    } catch {
    res.status(401).json({
        error: new Error('Invalid request!')
    });
    }

};