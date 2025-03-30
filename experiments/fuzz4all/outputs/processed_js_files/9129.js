 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchDataAndCompute() {
    try {
         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        let data = await response.json();

         
        print('Fetched data:', data);

         
        const fibGen = fibonacci();
        print('Fibonacci numbers:');
        for (let i = 0; i < 10; i++) {
            print(fibGen.next().value);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const user = {
    name: 'Alice',
    age: 30
};

const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
    }
};

const proxyUser = new Proxy(user, handler);

 
print(proxyUser.name);   
print(proxyUser.age);    

 
fetchDataAndCompute();
