 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5], status: 200 });
        }, 1000);
    });
};

const processNumbers = async () => {
    try {
        const { data: numbers, status } = await fetchData();
        if (status === 200) {
            const processedNumbers = numbers.map((num) => num * 2);
            const [first, ...rest] = processedNumbers;
            print(`First processed number: ${first}`);
            print(`Rest of the processed numbers: ${rest.join(", ")}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

processNumbers();
