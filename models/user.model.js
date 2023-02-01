const { randomUUID } = require('crypto');

class User {

    id;
    name;
    email;
    password;

    constructor(
        name,
        email,
        password,
        id = randomUUID()
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
