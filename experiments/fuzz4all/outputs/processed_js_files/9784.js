 

 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    while (n--) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function getData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
const sampleURL = 'https://jsonplaceholder.typicode.com/posts/1';

 
const personHandler = {
    set(target, key, value) {
        if (key === 'age') {
            if (typeof value !== 'number' || value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
        target[key] = value;
        return true;
    }
};

const person = new Proxy({}, personHandler);
person.name = 'John Doe';
person.age = 30;  
 

 
async function transformData() {
    let fibSequence = [...fibonacci(10)];  
    let promises = fibSequence.map(async num => {
        return { num, fetchedData: await getData(sampleURL) };
    });

    try {
        let transformedData = await Promise.all(promises);
        print(transformedData);
    } catch (error) {
        console.error('Error transforming data:', error);
    }
}

transformData();
