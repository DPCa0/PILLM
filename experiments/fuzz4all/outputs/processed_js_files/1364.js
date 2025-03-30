 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id: 1, name: 'John Doe', data: [10, 20, 30] });
    }, 1000);
});

async function* asyncGenerator() {
    const data = await fetchData();
    yield data;
}

(async () => {
    const iterator = asyncGenerator();
    const { value: { id, name, data: [first, second, third] } } = await iterator.next();

    print(`ID: ${id}, Name: ${name}`);
    print(`Data: First - ${first}, Second - ${second}, Third - ${third}`);
})();
