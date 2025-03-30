 

 
const fetchData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id < 3) {
                resolve({ id, name: `Item${id}`, value: Math.random() * 100 });
            } else {
                reject('ID not found');
            }
        }, 1000);
    });
};

 
const processData = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...data, processedValue: data.value.toFixed(2) });
        }, 500);
    });
};

 
const handleData = async (id) => {
    try {
        const rawData = await fetchData(id);
        const processedData = await processData(rawData);
        const { id: itemId, name, processedValue } = processedData;
        print(`Processed Data - ID: ${itemId}, Name: ${name}, Processed Value: ${processedValue}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

 
[1, 2, 3].forEach(id => handleData(id));
