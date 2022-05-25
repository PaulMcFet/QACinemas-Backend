const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const SECRET = process.env.TOKEN_SECRET;
const JWT_TIMEOUT = (60 * 30);





function generateAccessToken(username, role) {
    return jwt.sign({ username, role }, SECRET, { expiresIn: JWT_TIMEOUT });
}


function authenticationMiddleware(request, response, next) {
    const authHeader = request.header('authorization');
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(401).send('A token is required for authentication.');
    }
    
    
    jwt.verify(token, SECRET, (error, user) => {
        if (error) {
            console.error(error);
            return response.status(403).send('Invalid token supplied.');
        }
        
        request.user = user;
        console.log(`User ${user.username} was authorized successfully.`);
        
        next();
    });
}


function isAdmin(request, response, next) {
    if (request.user.role === 'ADMIN') {
        console.log(`Admin access granted to: ${request.user.username}`);
        return next();
    }
    console.log(`Admin access denied to: ${request.user.username}`);
    return response.status(403).send('Invalid token supplied.');
}


module.exports = {
    generateAccessToken,
    authenticationMiddleware,
    isAdmin,
    JWT_TIMEOUT
}