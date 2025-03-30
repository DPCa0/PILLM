 

 
const fetchData = (id, delay) => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id, data: `Data for ${id}` });
    }, delay);
});

 
async function processMultipleSources() {
    try {
         
        const [data1, data2, data3] = await Promise.all([
            fetchData(1, 1000),
            fetchData(2, 500),
            fetchData(3, 2000)
        ]);

         
        const combinedData = {
            ...data1,
            ...data2,
            ...data3,
        };

         
        print("Combined Data:", combinedData);

         
        function* dataIterator(data) {
            for (let key in data) {
                yield { key, value: data[key] };
            }
        }

         
        for (let item of dataIterator(combinedData)) {
            print(`Key: ${item.key}, Value: ${item.value}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
processMultipleSources();
