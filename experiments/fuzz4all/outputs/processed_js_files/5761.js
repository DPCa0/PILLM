 

const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve({data: [1, 2, 3, 4, 5]}) : reject('Fetch error');
    }, 1000);
});

const processData = async () => {
    try {
        const {data} = await fetchData();
        const process = (...values) => values.map(v => v * 2);
        const [a, b, ...rest] = process(...data);
        const result = `Processed Values: a = ${a}, b = ${b}, rest = ${rest}`;
        print(result);
    } catch (error) {
        console.error(`Error encountered: ${error}`);
    }
};

processData();
