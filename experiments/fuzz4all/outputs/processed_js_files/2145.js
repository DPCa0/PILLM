 
(async function () {
    const fetchData = (url) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5], status: 200 });
            } else {
                reject(new Error('Network Error'));
            }
        }, 1000);
    });

    const processData = async () => {
        try {
            const { data, status } = await fetchData("https://api.example.com/data");
            if (status === 200) {
                const [first, second, ...rest] = data;
                return { first, second, restSum: rest.reduce((a, b) => a + b, 0) };
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error(error.message);
            return null;
        }
    };

    const results = await processData();
    if (results) {
        const { first, second, restSum } = results;
        print(`First: ${first}, Second: ${second}, Rest Sum: ${restSum}`);
    }
})();
