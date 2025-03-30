 
const fetchData = async (url) => {
     
    const fakeFetch = (url) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ status: 200, data: { name: 'John', age: 30, city: 'New York' } });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });

    try {
        const response = await fakeFetch(url);
        if (response.status === 200) {
             
            const { name, age, city } = response.data;
            print(`Name: ${name}, Age: ${age}, City: ${city}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

 
function* urlGenerator() {
    yield 'https://api.example.com/data';
    yield 'https://api.example.com/invalid-url';
}

const urlGen = urlGenerator();
for (let url of urlGen) {
    fetchData(url);
}
