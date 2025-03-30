 
const complexOperation = async (input) => {
     
    const multiplyByTwo = (num) => new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));
    
     
    const fetchDataAndProcess = async () => {
        const data = { a: 2, b: 3, c: 4 };
        const { a, b, c } = data;

        const [resultA, resultB, resultC] = await Promise.all([
            multiplyByTwo(a),
            multiplyByTwo(b),
            multiplyByTwo(c),
        ]);
        
         
        return processResults`Results: ${resultA}, ${resultB}, ${resultC}`;
    };
    
     
    const processResults = (strings, ...values) => {
        return strings.reduce((acc, str, index) => acc + str + (values[index] || ''), '');
    };

    try {
        const result = await fetchDataAndProcess();
        print(`Final Result for input ${input}: ${result}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

 
(() => {
    const input = 5;
     
    complexOperation?.(input);
})();
