 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
class DataProcessor {
    #data = [];
    
    constructor(data) {
        this.#data = data;
    }

     
    #processData() {
        return this.#data.map(item => ({
            ...item,
            processed: true
        }));
    }

     
    logProcessedData() {
        print(this.#processData());
    }

     
    static filterData(data, criteria) {
        return data.filter(criteria);
    }
}

 
function* dataGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const rawData = await fetchData(url);

    if (!rawData) return;

    const processor = new DataProcessor(rawData);
    processor.logProcessedData();

    const incompleteTasks = DataProcessor.filterData(rawData, task => !task.completed);

    print('Incomplete tasks:', incompleteTasks);

    const generator = dataGenerator(incompleteTasks);

     
    let task;
    while (!(task = generator.next()).done) {
        print('Processing task:', task.value);
    }
})();
