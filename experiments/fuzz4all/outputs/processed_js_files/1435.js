 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: [1, 2, 3, 4, 5], message: 'Data fetched successfully' });
            } else {
                reject('URL is required');
            }
        }, 2000);
    });
};

const processData = async (url) => {
    try {
        const { data, message } = await fetchData(url);
        print(message);
        return data.map(num => num * 2);
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
};

const main = async () => {
    const url = 'https://api.example.com/data';
    const result = await processData(url);
    print('Processed Data:', result);
};

main();
