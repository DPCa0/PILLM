 
function processData({a, b = 10} = {}, ...rest) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const result = a?.value ?? 0 + b + rest.reduce((sum, n) => sum + (n ?? 0), 0);
            result >= 0 ? resolve(result) : reject('Invalid result');
        }, 1000);
    });
}

 
async function executeComplexOperation() {
    try {
         
        const uniqueKey = Symbol('unique');
        const module = await import('./helperModule.js');  
        
         
        const dataMap = new Map([[uniqueKey, {value: 15}], ['key2', {value: 5}]]);
        const dataSet = new Set([...[1, 2, 3], ...[4, 5, 6]]);
        
         
        const results = await Promise.allSettled([
            processData(dataMap.get(uniqueKey), ...dataSet),
            processData({a: {value: 20}}, 5, null),
            processData()
        ]);
        
         
        print(results.flatMap(result => result.status === 'fulfilled' ? result.value : []));
        
         
        module.helperFunction();
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

executeComplexOperation();
