class User {
    #name;
    static #idCounter = 0;

    constructor(name, age) {
        this.#name = name;
        this.age = age;
        this.id = User.#generateId();
    }

    static #generateId() {
        return ++this.#idCounter;
    }

    getName() {
        return this.#name;
    }

    *yearsLived() {
        for (let i = 0; i <= this.age; i++) {
            yield i;
        }
    }
}

function logUserDetails(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user instanceof User) {
                resolve(`User: ${user.getName()}, Age: ${user.age}, ID: ${user.id}`);
            } else {
                reject('Invalid user');
            }
        }, 1000);
    });
}

async function main() {
    const alice = new User('Alice', 25);
    const bob = new User('Bob', 30);

    try {
        const details = await Promise.all([logUserDetails(alice), logUserDetails(bob)]);
        print(details.join('\n'));
    } catch (error) {
        console.error(error);
    }

    const [aliceYears, bobYears] = [alice.yearsLived(), bob.yearsLived()];
    print('Alice has lived these years:', [...aliceYears]);
    print('Bob has lived these years:', [...bobYears]);
}

main();
