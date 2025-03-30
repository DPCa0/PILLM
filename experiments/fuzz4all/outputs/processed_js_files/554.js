(async () => {
     
    function* fibonacci() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }

     
    const fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };

     
    const createValidatedObject = (target) => {
        return new Proxy(target, {
            set(obj, prop, value) {
                if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
                    throw new Error('Age must be a positive number');
                }
                obj[prop] = value;
                return true;
            }
        });
    };

     
    const complexKeyMap = new Map();
    const key1 = { id: 1 };
    const key2 = { id: 2 };
    complexKeyMap.set(key1, 'value1');
    complexKeyMap.set(key2, 'value2');

     
    const privateData = new WeakMap();
    class SecretHolder {
        constructor(secret) {
            privateData.set(this, { secret });
        }
        revealSecret() {
            return privateData.get(this).secret;
        }
    }

     
    const user = createValidatedObject({ name: 'Alice', age: 25 });

    try {
        user.age = -5;  
    } catch (e) {
        console.error(e.message);
    }

     
    print(complexKeyMap.get(key1));  
    print(complexKeyMap.get(key2));  

     
    const fib = fibonacci();
    print([...Array(5)].map(() => fib.next().value));  

     
    const secret = new SecretHolder('This is a secret');
    print(secret.revealSecret());  

     