 
async function fetchDataAndProcess() {
    const fakeAPI = () => new Promise((resolve) =>
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000)
    );

    try {
         
        let response = await fakeAPI();
        let { data } = response;

         
        let uniqueData = [...new Set(data.map(x => x * 2))];

         
        let transformedData = uniqueData
            .filter(x => x % 3 === 0)
            .map(x => ({ value: x, timestamp: new Date().toISOString() }));

         
        for (let { value, timestamp } of transformedData) {
            print(`Processed Value: ${value}, Time: ${timestamp}`);
        }

         
        let handler = {
            set(target, key, value) {
                print(`Property ${key} set to ${value}`);
                target[key] = value;
                return true;
            }
        };

        let observedObject = new Proxy({}, handler);
        observedObject.data = transformedData;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
fetchDataAndProcess();
