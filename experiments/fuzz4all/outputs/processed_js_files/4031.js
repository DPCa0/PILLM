 
function memoize(fn) {
    const cache = new Map();
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                print(`Fetching from cache for args: ${key}`);
                return cache.get(key);
            }
            print(`Computing result for args: ${key}`);
            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });
}

 
async function* fetchUserData(ids) {
    for (const id of ids) {
        await new Promise(r => setTimeout(r, 500));  
        yield { id, name: `User${id}` };
    }
}

 
class User {
    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    #greet() {
        return `Hello, ${this.#name}!`;
    }

    publicGreet() {
        return this.#greet();
    }
}

 
const factorial = memoize(function f(n, acc = 1) {
    if (n <= 1) return acc;
    return f(n - 1, acc * n);
});

 
(async () => {
     
    print(factorial(5));  
    print(factorial(6));  

     
    for await (const userData of fetchUserData([1, 2, 3])) {
        const user = new User(userData.id, userData.name);
        print(user.publicGreet());
    }
})();
