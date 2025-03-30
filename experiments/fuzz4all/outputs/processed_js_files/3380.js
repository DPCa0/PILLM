class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    #secretKey = Symbol('secret');  

    getInfo() {
        return `${this.name} is ${this.age} years old.`;
    }

    [this.#secretKey]() {
        return `This is a secret message for ${this.name}.`;
    }

    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    *numbersGen() {
        let i = 1;
        while (true) yield i++;
    }
}

(async () => {
     
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.default.min.js');

     
    const bigNumber = BigInt(9007199254740991);
    const nullValue = null;
    const fallbackValue = nullValue ?? 'Default Value';

    print(`BigInt Example: ${bigNumber}`);
    print(`Nullish Coalescing Example: ${fallbackValue}`);

    const user = new User('Alice', 30);

     
    const handler = {
        get(target, prop, receiver) {
            if (prop === 'age') {
                return `Age is private!`;
            }
            return Reflect.get(...arguments);
        },
    };

    const proxiedUser = new Proxy(user, handler);
    print(proxiedUser.getInfo());
    print(`Proxied Age: ${proxiedUser.age}`);

     
    const data = await User.fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched Title: ${data?.title}`);

     
    const gen = user.numbersGen();
    print(`Generator Output: ${gen.next().value}, ${gen.next().value}, ${gen.next().value}`);

     
    print(`Lodash Chunk: ${JSON.stringify(_.chunk(['a', 'b', 'c', 'd'], 2))}`);
})();
