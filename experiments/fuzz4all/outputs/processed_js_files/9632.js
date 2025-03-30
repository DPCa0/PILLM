 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                users: [
                    { id: 1, name: 'Alice', age: 28 },
                    { id: 2, name: 'Bob', age: 34 },
                ],
                status: 'success'
            };
            resolve(data);
        }, 1000);
    });
};

 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

     
    process() {
        const { users } = this.data;
        return users.map(({ id, name }) => ({ userId: id, userName: name.toUpperCase() }));
    }
}

 
const main = async () => {
    try {
         
        const data = await fetchData();

         
        const processor = new DataProcessor(data);
        const processedData = processor.process();

         
        print(processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
main();
