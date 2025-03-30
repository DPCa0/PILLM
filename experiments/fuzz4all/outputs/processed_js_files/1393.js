 

(async function() {
     
    const elements = new Map([
        ['H', 'Hydrogen'],
        ['He', 'Helium'],
        ['Li', 'Lithium'],
        ['Be', 'Beryllium']
    ]);

    const uniqueSymbols = new Set(['H', 'He', 'Li', 'Be']);

     
    const description = Symbol('description');
    elements[description] = `The periodic table contains ${elements.size} elements in this example.`;

     
    const elementDetails = {
        [description]: elements[description],
        ...(Object.fromEntries([...elements.entries()].map(([symbol, name]) => ({
            [symbol]: { name, atomicNumber: uniqueSymbols.size + 1 }
        })))),
    };

     
    const getElementDetails = (symbol) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (elementDetails[symbol]) {
                    resolve(elementDetails[symbol]);
                } else {
                    reject(new Error('Element not found'));
                }
            }, 1000);
        });
    };

     
    for (let symbol of uniqueSymbols) {
        try {
            let details = await getElementDetails(symbol);
            print(`Element: ${symbol}, Details:`, details);
        } catch (error) {
            console.error(error.message);
        }
    }

    print(elementDetails[description]);

})();
