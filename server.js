const express = require('express');
const routes = require('./src/routes/userRoutes');
const jwt require('jsonwebtoken');
const User = require('./src/models/user');
const app = express();
const port = process.env.PORT || 3000;
// connect mongoDB

// connect express body parser
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'SECRETWORD', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(`Server running on port ${port}`)
});

app.listen(port, () => {
    console.log('Server running on port', port);
});
