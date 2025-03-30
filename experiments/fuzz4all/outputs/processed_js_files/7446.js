 
(async function complexFeatureDemo() {
    const fetchData = () => new Promise((resolve) =>
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000)
    );

    try {
        const { data } = await fetchData();
        const processData = (array) => array.map((num) => num * 2);

        const [first, second, ...rest] = processData(data);
        const newData = [0, ...rest, second, first];
        
        print('Processed Data:', newData);

        const sum = newData.reduce((acc, val) => acc + val, 0);
        print('Sum of Processed Data:', sum);
        
        const checkEvenOdd = new Map(newData.map(num => [num, num % 2 === 0 ? 'Even' : 'Odd']));
        print('Even/Odd Mapping:', Array.from(checkEvenOdd.entries()));
    } catch (error) {
        console.error('Error:', error);
    }
})();
