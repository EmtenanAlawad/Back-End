const User = require('../models/user.model');
const users = require('../databases/users');

class UsersService {
    database;

    constructor(database) {
        this.database = database;
    }

    create({ name, email, password }) {

        const user = new User(name, email, password);

        this.database.push(user);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    }

    update(user, payload) {
        Object.assign(user, {
            name: payload.name || user.name,
            email: payload.email || user.email,
            password: payload.password || user.password,
        });

        return user;
    }

    find() {
        return this.database
    }

    findOneOrFail(id) {
        const user = this.database.find(user => user.id === id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    delete(user) {
        this.database.splice(this.database.indexOf(user), 1);
    }
}


const usersService = new UsersService(users);
module.exports = { usersService };
