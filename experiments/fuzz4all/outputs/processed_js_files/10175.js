 
async function fetchAndProcessData() {
     
    const fetchData = async (url) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                url ? resolve({ data: [1, 2, 3, 4, 5] }) : reject('Invalid URL');
            }, 1000);
        });
    };

    try {
        const { data } = await fetchData('https://api.example.com/data');

         
        const processedData = [...data].map((num) => num * 2);

         
        const sum = processedData.reduce((total, num) => total + num, 0);

         
        function logResult(strings, ...values) {
            print(strings.raw.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, ''));
        }

        logResult`Processed Data: ${processedData}\nSum of Processed Data: ${sum}`;

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

fetchAndProcessData();
