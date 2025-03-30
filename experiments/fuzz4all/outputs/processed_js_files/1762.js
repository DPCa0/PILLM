 

const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const mockData = {
            'https://api.example.com/data': { data: [1, 2, 3, 4, 5] },
            'https://api.example.com/user': { user: { name: 'John Doe', age: 30 } }
        };
        if (mockData[url]) {
            resolve(mockData[url]);
        } else {
            reject('URL not found');
        }
    }, 1000);
});

const processData = async (url) => {
    try {
        const response = await fetchData(url);
        const { data } = response;
        print(`Data: ${data.join(', ')}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const getUserInfo = async (url) => {
    try {
        const response = await fetchData(url);
        const { user: { name, age } } = response;
        print(`User Info: ${name}, Age: ${age}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

(async () => {
    await Promise.all([
        processData('https://api.example.com/data'),
        getUserInfo('https://api.example.com/user')
    ]);
})();
