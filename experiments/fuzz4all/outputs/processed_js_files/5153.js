 
class Secret {
    #hiddenMessage;
    constructor(message) {
        this.#hiddenMessage = message;
    }

    revealMessage() {
        return this.#hiddenMessage.split('').reverse().join('');
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop === 'secret') {
            return 'Access Denied!';
        }
        return Reflect.get(obj, prop);
    }
};

const secret = new Secret('Hello, JavaScript!');
const proxySecret = new Proxy(secret, handler);

print(proxySecret.revealMessage());  
print(proxySecret.secret);  

 
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    print(values);  
});

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1');
