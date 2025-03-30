 
class ApiService {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = {
                    status: 200,
                    payload: { message: 'Hello, world!', numbers: [1, 2, 3, 4, 5] }
                };
                resolve(data);
            }, 1000);
        });
    }
}

async function processData() {
    try {
        const { payload: { message, numbers } } = await ApiService.fetchData('https://example.com/api');
        
        const numberOperations = numbers.map(num => {
            const result = num * 2;
            return new Promise(resolve => setTimeout(() => resolve(result), 500));
        });

        const processedNumbers = await Promise.all(numberOperations);
        
        print(message);
        print('Processed Numbers:', processedNumbers);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

processData();
