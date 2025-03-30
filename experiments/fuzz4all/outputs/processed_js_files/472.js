 
async function* fetchDataSimulator() {
    const dataChunks = ['{"name": "Alice", "age": 30}', '{"name": "Bob", "age": 25}'];
    for (const chunk of dataChunks) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield JSON.parse(chunk);
    }
}

 
const loggerHandler = {
    get: (target, property) => {
        print(`Property '${property}' was accessed.`);
        return target[property];
    }
};

 
(async function processAndLogData() {
    const simulator = fetchDataSimulator();
    for await (const item of simulator) {
        const proxiedItem = new Proxy(item, loggerHandler);
         
        const age = proxiedItem.age?.toString() ?? "Age not available";
        print(`Name: ${proxiedItem.name}, Age: ${age}`);
    }
})();

 
function formatter(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}<strong>${values[i] || ''}</strong>`, '');
}

const user = { name: "Charlie", score: 42 };
print(formatter`User: ${user.name}, Score: ${user.score}`);
