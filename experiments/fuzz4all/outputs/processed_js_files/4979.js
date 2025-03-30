 

const fetchData = async (url) => {
     
    const simulateFetch = (url) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (url) {
                    resolve({ status: 200, data: { user: { id: 1, name: 'John Doe' } } });
                } else {
                    reject(new Error('Invalid URL'));
                }
            }, 1000);
        });

    try {
        const response = await simulateFetch(url);

         
        const {
            data: { user: { id, name } }
        } = response;

        print(`User ID: ${id}, User Name: ${name}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const urlTag = (strings, ...values) => {
    return strings.raw[0] + values.join('');
};

 
(async () => {
    const userId = 1;
    await fetchData(urlTag`https: 
})();
