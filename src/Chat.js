const uuid = require("uuid");

class Chat {
    constructor() {
        this.messages = [];
        this.users = [
            {
                name: "test",
                id: uuid.v4(),
                createData: new Date().toLocaleString(),
            },
        ];
    }

    createNewUser(name) {
        const index = this.users.findIndex((item) => item.name === name);

        if (index == -1) {
            const user = {
                id: uuid.v4(),
                name: name,
                createData: new Date().toLocaleString(),
            };

            this.users.push(user);
        } else {
            return new Error("invalid name");
        }
    }

    getAllUsers() {
        return this.users;
    }

    getAllMessages() {
        return this.messages;
    }

    createNewMessage(author, text) {
        const message = {
            autor: author,
            text: text,
            id: uuid.v4,
            createData: new Date().toLocaleString(),
        };

        this.messages.push(message);
    }

    deleteUser(id) {
        const index = this.users.findIndex((item) => item.id == id);

        if (index !== -1) {
            this.users.splice(0, index);
        }
    }

    deleteMessage(id) {
        const index = this.messages.findIndex((item) => item.id == id);

        if (index !== -1) {
            this.messages.splice(0, index);
        }
    }

    deleteAllUsers() {
        return (this.users = []);
    }
}

module.exports = Chat;
