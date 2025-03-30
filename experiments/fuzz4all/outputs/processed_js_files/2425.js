 
const applyToAll = (arr, callback) => arr.map(callback);

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
    });
};

 
(async () => {
    try {
         
        const [first, ...rest] = await fetchData();
        print(`First Element: ${first}`);
        
         
        const squared = applyToAll(rest, num => num ** 2);
        print(`Squared Rest: ${squared}`);

         
        const tag = (strings, ...values) => strings.reduce((acc, str, i) => `${acc}${str}<${values[i] || ''}>`, '');
        print(tag`Processed Data: First=${first}, Squared Rest=${squared.join(', ')}`);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
