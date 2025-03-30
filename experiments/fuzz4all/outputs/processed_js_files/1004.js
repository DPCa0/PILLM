 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            name: 'Example',
            value: 42,
            details: { type: 'Sample', attributes: ['fast', 'reliable', 'popular'] }
        };
        url ? resolve(data) : reject('URL is required');
    }, 1000);
});

 
const processData = async (url) => {
    try {
        const data = await fetchData(url);
        
         
        const { name, value, details: { type, attributes: [firstAttr, ...otherAttrs] } } = data;
        
        print(`Name: ${name}, Value: ${value}, Type: ${type}`);
        print(`Attributes: ${firstAttr}, Others: ${otherAttrs.join(', ')}`);
        
         
        yield* attributesGenerator(attributes);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
function* attributesGenerator(attributes) {
    for (const attr of attributes) {
        yield attr;
    }
}

 
(async () => {
    const url = 'https://example.com/data';
    const generator = await processData(url);
    print('Iterating over attributes:');
    for (const attr of generator) {
        print(`Attribute: ${attr}`);
    }
})();
