 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve({ data: "Sample data from " + url });
            } else {
                reject("Error fetching data from " + url);
            }
        }, 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Property "${prop}" accessed`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property "${prop}" set to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const dataStore = new Proxy({}, handler);

 
(async () => {
    try {
        const data = await fetchData("https://api.example.com/data");
        dataStore.data = data.data;

        print(dataStore.data);

         
        const newData = { ...data, timestamp: Date.now() };
        const { data: oldData, ...rest } = newData;
        print("Old Data:", oldData, "| Additional Info:", rest);

    } catch (error) {
        console.error(error);
    }
})();
