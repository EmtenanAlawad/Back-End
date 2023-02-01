// TODO: Create a route that will do the following:
// 1. Handle a POST request to /auth/login that will take in an email and password as the request body
//      and will return a JSON object with a token property. This token SHOULD be stored in the database.

const express = require('express');
const { authService } = require('../../services/auth.service');
const HttpError = require('../../models/http-error.model');
const router = express.Router();

router.post('/auth/login', (req, res, next) => {
    try {
        const {email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: 'Bad Request',
            });
        }

       const token=authService.checkUser(email,password);

        res.json({
            token,
        });
    } catch (e) {
        throw new HttpError(500, e.message);
    }  
});

// 2. Handle a POST request to /auth/profile that will take in a token in the request header with key Authentication.
//      Our clients should send the token in the following format: "Bearer <token>". for example:
//      "Bearer 1234567890". If the token is valid, then return a JSON object with the user's profile.


router.post('/auth/profile', (req, res, next) => {
    try {
        const token = req.header('authorization');

        if (!token) {
            return res.status(400).json({
                message: 'Bad Request',
            });
        }
        // token.substring(token.indexOf(' ') + 1);
        const user=authService.checkToken(token.slice(7));

        res.json({
            user,
        });
    } catch (e) {
        throw new HttpError(500, e.message);
    }  
});



module.exports = router;

