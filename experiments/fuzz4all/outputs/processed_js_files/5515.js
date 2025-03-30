 

 
const DataModule = (() => {
    const data = [1, 2, 3, 4, 5];

    const fetchData = async () => {
         
        return new Promise(resolve => {
            setTimeout(() => resolve(data), 1000);
        });
    };

    return { fetchData };
})();

 
const UtilsModule = (() => {
    const sum = (a, b) => a + b;
    const double = (x) => x * 2;

    return { sum, double };
})();

 
(async () => {
    try {
        const { fetchData } = DataModule;
        const { sum, double } = UtilsModule;

        const data = await fetchData();   

         
        const [first, second, ...rest] = data;
        
         
        const doubledData = data.map(x => double(x));
        print('Doubled Data:', doubledData);

         
        print('Sum of first two:', sum(first, second));

         
        print('Remaining elements:', rest);

    } catch (error) {
        console.error('Error:', error);
    }
})();
