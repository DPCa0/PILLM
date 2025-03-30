 
class ComplexExample {
    constructor() {
        this.data = [...Array(10).keys()].map(num => ({ id: num, value: Math.random() * 100 }));
    }

    fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data);
            }, 1000);
        });
    }

    async processData() {
        const data = await this.fetchData();
        const sortedData = [...data].sort((a, b) => a.value - b.value);
        const [min, ...restData] = sortedData;
        const max = restData.pop();

        return { min, max, restData };
    }
}

(async () => {
    const example = new ComplexExample();
    const { min, max, restData } = await example.processData();
    
    print('Minimum:', min);
    print('Maximum:', max);
    print('Rest:', restData);
})();
