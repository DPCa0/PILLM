 

 
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https: 
        if (!response.ok) throw new Error('Network response was not ok');
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property ${prop} has been accessed.`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting value ${value} to property ${prop}.`);
        return Reflect.set(target, prop, value);
    }
};

const user = { name: 'John Doe', age: 25 };
const proxyUser = new Proxy(user, handler);

 
(async () => {
     
    const userData = await fetchUserData(1);
    print('User Data:', userData);

     
    const fib = fibonacci();
    print('Fibonacci:', fib.next().value, fib.next().value, fib.next().value);

     
    print(proxyUser.name);
    proxyUser.age = 30;
    print(proxyUser.age);
})();
