 
const factorial = (n, acc = 1) => (n <= 1 ? acc : factorial(n - 1, n * acc));

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

 
const dataHandler = {
    get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} does not exist`),
    set: (target, prop, value) => {
        if (typeof value !== 'number') throw new TypeError('Value must be a number');
        target[prop] = value;
        return true;
    },
};

const data = new Proxy({}, dataHandler);

 
(async () => {
    try {
        const result = await fetchData('https://api.example.com/data');
        print('Fetched Data:', ...result.data);

         
        const [first, second, ...rest] = result.data;
        print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

         
        data.a = 10;
        print('Data a:', data.a);

         
        const filteredData = result.data
            .map(num => num * num)
            .filter(num => num > 10);
        print('Filtered Data:', filteredData);

         
        const uniqueSet = new Set([...result.data, 2, 3, 6]);
        print('Unique Set:', uniqueSet);

         
        function* numberGenerator() {
            for (let num of uniqueSet) {
                yield num;
            }
        }

        const gen = numberGenerator();
        print('Generated Numbers:');
        for (let number of gen) {
            print(number);
        }

         
        console.log('