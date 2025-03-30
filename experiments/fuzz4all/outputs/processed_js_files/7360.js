 
const complexObject = {
    name: 'Advanced Features',
    data: [1, 2, 3, 4, 5],
    *numberGenerator() {
        for (let i of this.data) {
            yield i;
        }
    },
    async fetchData(url) {
        const response = await fetch(url);
        return response.json();
    },
    logNumbers() {
        const numbers = this.data.map(num => num * num);
        print('Squared Numbers:', ...numbers);
    },
    get summary() {
        return `${this.name} has ${this.data.length} elements.`;
    }
};

 
const { numberGenerator, fetchData, logNumbers, summary } = complexObject;

 
const generator = numberGenerator();
for (let value of generator) {
    print('Generated Value:', value);
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log('Fetched Data:', data))
    .catch(err => console.error('Fetch Error:', err));

 
logNumbers();

 
print('Summary:', summary);

 
const proxy = new Proxy(complexObject, {
    get(target, prop) {
        if (prop === 'name') {
            return `Proxy - ${target[prop]}`;
        }
        return target[prop];
    }
});

print('Proxy Name:', proxy.name);
