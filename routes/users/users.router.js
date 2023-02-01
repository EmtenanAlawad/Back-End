const express = require('express');
const { usersService } = require('../../services/users.service');
const HttpError = require('../../models/http-error.model');
const router = express.Router();

/**
 * A POST route to handle the submission of the form. This route will
 * create a new user in the database.
 */
router.post('/', (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Bad Request',
            });
        }

        const user = usersService.create({ name, email, password });
       
        res.json({
            user,
        });
    } catch (e) {
        throw new HttpError(500, e.message);
    }
    
})

/**
 * A GET route to handle the retrieval of all users in the database.
 */
router.get('/', (req, res, next) => {
    try {
        const users = usersService.find();

        res.json(users);
    } catch (error) {
        throw new HttpError(500, error.message);
    }
})

/**
 * A GET route to handle the retrieval of a single user in the database.
 */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    try {
        const user = usersService.findOneOrFail(id);

        res.json(user);
    } catch (error) {
        throw new HttpError(404, error.message);
    }
});
/**
 * A PATCH route to handle the updating of a single user in the database.
 */
router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let user;

    try {
        user = usersService.findOneOrFail(id);
    } catch (error) {
        throw new HttpError(404, error.message);
    }

    try {
        user = usersService.update(id, { name, email, password });
        res.json(user);
    } catch (error) {
        throw new HttpError(400, 'Unable to update user');
    }
});

/**
 * A DELETE route to handle the deletion of a single user in the database.
 */
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    let user;

    try {
        user = usersService.findOneOrFail(id);
    } catch (error) {
        throw new HttpError(404, error.message);
    }

    try {
        usersService.delete(user);

        res.json({
            message: 'Success',
        });
    } catch (error) {
        throw new HttpError(400, 'Unable to delete user');
    }
});

module.exports = router;
