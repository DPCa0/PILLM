class User {
    #id;
    #isAdmin;

    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.#id = this.#generateId();
        this.#isAdmin = false;
    }

    #generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    static fromData({ name, email, isAdmin }) {
        const user = new User(name, email);
        user.#isAdmin = isAdmin ?? false;
        return user;
    }

    async loadPermissions() {
        this.permissions = await new Promise(resolve => setTimeout(() => resolve(['read', 'write']), 500));
    }

    set admin(value) {
        this.#isAdmin = value;
    }

    get details() {
        return {
            id: this.#id,
            name: this.name,
            email: this.email,
            isAdmin: this.#isAdmin
        };
    }
}

(async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com', isAdmin: true };
    const user = User.fromData(userData);

    await user.loadPermissions();

    const { details: { name, email, isAdmin }, permissions } = user;

    const permissionsProxy = new Proxy(permissions, {
        get(target, prop) {
            return prop in target ? target[prop] : 'Permission not found';
        }
    });

    console.log(`
        User Info:
        Name: ${name}
        Email: ${email}
        Is Admin: ${isAdmin}
        Permissions: ${permissionsProxy[0]}, ${permissionsProxy[1]}
    `);
})();
