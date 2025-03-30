 
import fetch from 'node-fetch';

 
async function fetchData(urls) {
    try {
        const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
        const results = await Promise.all(fetchPromises);

        return results.map((result, index) => ({
            url: urls[index],
            data: result
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get: function(target, property) {
        return property in target ? target[property] : `Property "${property}" not found`;
    }
};

const dynamicObject = new Proxy({ name: 'JavaScript', type: 'Language' }, handler);

 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        [prev, curr] = [curr, prev + curr];
        yield prev;
    }
}

 
(async function() {
    const urls = [
        'https://api.github.com',
        'https://api.github.com/users/octocat'
    ];
    const fetchedData = await fetchData(urls);

    print('Fetched Data:', fetchedData);
    print('Dynamic Object:', dynamicObject.name);
    print('Non-existent Property:', dynamicObject.nonExistent);

    const fib = fibonacci(10);
    print('Fibonacci Sequence:');
    for (let num of fib) {
        print(num);
    }
})();
