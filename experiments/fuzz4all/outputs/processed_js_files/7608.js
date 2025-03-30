(async () => {
    const fetchUserData = async (url) => {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };

    class User {
        #username;
        #email;
        constructor({ username, email }) {
            this.#username = username;
            this.#email = email;
        }
        get details() {
            return { username: this.#username, email: this.#email };
        }
        toString() {
            return `User [username: ${this.#username}, email: ${this.#email}]`;
        }
    }

    const processUserData = async (url) => {
        const userData = await fetchUserData(url);
        if (!userData) return;

        const users = userData.map(user => new User(user));
        const usernames = users.map(user => user.details.username);

        const capitalizeUsernames = new Proxy(usernames, {
            get: (target, prop) => {
                if (typeof prop === 'string' && /^[0-9]+$/.test(prop)) {
                    return target[prop].toUpperCase();
                }
                return target[prop];
            }
        });

        print('Capitalized Usernames:', capitalizeUsernames.join(', '));
    };

    const userApi = 'https://jsonplaceholder.typicode.com/users';
    processUserData(userApi);
})();
