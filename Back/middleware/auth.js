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
        const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxMTczOTYwMSwiaWF0IjoxNjExNzM5NjAxfQ.g-hcbPqOZ5DyWdeluvb0y1_GK4nJ-dw_M4FCXqYfW7E');
        const userId = decodedToken.userId;
    if (userIn != userId) {
        console.log('pas co');
        throw 'Invalid user ID';
    } else {
        console.log('co');
        next();
    }
    } catch {
    res.status(401).json({
        error: new Error('Invalid request!')
    });
    }

};