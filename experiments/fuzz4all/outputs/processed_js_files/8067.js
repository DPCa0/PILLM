 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ data: 'Important Data', code: 200 });
    }, 1000);
});

 
async function getData() {
    try {
        const response = await fetchData();
        if (response.code !== 200) throw new Error('Failed to fetch data');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    *processData() {
        const dataArray = this.data.split(' ');
        for (let word of dataArray) {
            yield word.toUpperCase();
        }
    }
}

 
const validator = {
    set: (target, key, value) => {
        if (typeof value !== 'string' || value.length < 1) {
            throw new Error(`Invalid data: ${value}`);
        }
        target[key] = value;
        return true;
    }
};

 
(async function main() {
    const data = await getData();
    const processedData = new Proxy({ result: '' }, validator);

    if (data) {
        const processor = new DataProcessor(data);
        const generator = processor.processData();
        let word = generator.next();
        while (!word.done) {
            processedData.result += `${word.value} `;
            word = generator.next();
        }
    }

    print('Processed Data:', processedData.result.trim());
})();
