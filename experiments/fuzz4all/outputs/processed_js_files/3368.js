 

 
const mockData = {
    user: { name: "John Doe", age: 30 },
    post: { title: "Async Programming", content: "JavaScript is versatile!" }
};

 
const apiHandler = {
    get: (target, prop) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (target[prop]) {
                    resolve(target[prop]);
                } else {
                    reject(`No data found for ${prop}`);
                }
            }, 1000);
        });
    }
};

 
const api = new Proxy(mockData, apiHandler);

 
async function fetchData(endpoint) {
    try {
        const data = await api[endpoint];
        print(`Fetched data:`, data);
    } catch (error) {
        console.error(error);
    }
}

 
(async () => {
    await Promise.all([fetchData('user'), fetchData('post'), fetchData('comment')]);
})();
