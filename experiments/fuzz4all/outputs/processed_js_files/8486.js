 
async function* fetchData() {
    const dataChunks = ["Hello", "advanced", "JavaScript", "world", "!"];
    for (const chunk of dataChunks) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield chunk;
    }
}

 
function processElements(processor) {
    return async function(elementsGenerator) {
        const results = [];
        for await (let element of elementsGenerator) {
            results.push(processor(element));
        }
        return results;
    }
}

 
const logHandler = {
    get: (target, property) => {
        print(`Accessing property '${property}'`);
        return Reflect.get(target, property);
    }
};

 
(async function main() {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);  

    const processedData = await processElements(capitalize)(fetchData());

    const proxiedData = new Proxy(processedData, logHandler);

     
    function template(strings, ...values) {
        return strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
    }

    print(template`Final Result: ${proxiedData.join(' ')}`);
})();
