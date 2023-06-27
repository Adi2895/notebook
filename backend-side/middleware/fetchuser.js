var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Adityajangrais$a$good%$boy';

const fetchuser = (req, res, next) => {

    // get the user from the jwt token and add id to the req
    // object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token in the start" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token in the end" })
    }

}
// app.use(fetchuser);

module.exports.fetchuser = fetchuser;