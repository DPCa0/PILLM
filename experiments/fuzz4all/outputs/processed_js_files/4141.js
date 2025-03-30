class User {
    #password;

    constructor(username, password) {
        this.username = username;
        this.#password = this.#encryptPassword(password);
    }

    #encryptPassword(password) {
        return password.split('').reverse().join('') + '_encrypted';
    }

    *generateToken() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 16; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        yield token;
    }

    async validatePassword(inputPassword) {
        const encryptedInput = await this.#mockApiCall(inputPassword);
        return encryptedInput === this.#password;
    }

    #mockApiCall(password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.#encryptPassword(password));
            }, 1000);
        });
    }
}

const user = new User('john_doe', 's3cr3t');
const tokenGenerator = user.generateToken();

print('Generated Token:', tokenGenerator.next().value);

user.validatePassword('s3cr3t').then(isValid => {
    print('Is password valid?', isValid);
});

(async function() {
    print('Awaiting validation...');
    const isValid = await user.validatePassword('wrong_pass');
    print('Is password valid with wrong pass?', isValid);
})();
