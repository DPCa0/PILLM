 
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];  
    }
}

 
const handler = {
    get(target, property) {
        if (property === 'first') {
            return target[0];
        }
        if (property === 'last') {
            return target[target.length - 1];
        }
        return target[property];
    }
};

const arrayProxy = new Proxy([], handler);

 
async function fetchDataAndProcess(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new Promise((resolve) => {
        setTimeout(() => resolve(data.map(item => item.value * 2)), 1000);
    });
}

 
function tag(strings, ...values) {
    return strings.raw[0] + values.map((v, i) => v.toString().toUpperCase() + strings.raw[i + 1]).join('');
}

const message = tag`Hello, ${"world"}! Your Fibonacci number is: `;

 
const fib = fibonacci();
for (let i = 0; i < 10; i++) {
    arrayProxy.push(fib.next().value);
}

print(message + arrayProxy.last);

 
fetchDataAndProcess('https://api.example.com/data')
    .then(processedData => console.log('Processed data:', processedData))
    .catch(error => console.error('Error fetching data:', error));
