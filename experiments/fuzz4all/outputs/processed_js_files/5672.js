 
async function* fetchData() {
    const dataPoints = [1, 2, 3, 4, 5];
    for (let point of dataPoints) {
        yield await new Promise(resolve => 
            setTimeout(() => resolve(point), Math.random() * 1000)
        );
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property ${property}`);
            return target[property];
        } else {
            throw new Error(`Property ${property} does not exist.`);
        }
    }
};

 
const targetObject = {a: 10, b: 20, c: 30};
const proxyObject = new Proxy(targetObject, handler);

 
function messageFormatter(strings, ...expressions) {
    return strings.reduce((result, str, i) => 
        result + str + (expressions[i] || ''), '');
}

 
Reflect.set(proxyObject, 'd', 40);

(async () => {
     
    print("Fetching data:");
    for await (let data of fetchData()) {
        print(`Fetched data point: ${data}`);
    }

    print("\nAccessing Proxy object properties:");
    try {
        print(`Property a: ${proxyObject.a}`);
        print(`Property d: ${proxyObject.d}`);
        print(`Property nonExistent: ${proxyObject.nonExistent}`);
    } catch (e) {
        console.error(e.message);
    }

    print("\nFormatted message:");
    const x = 10, y = 20;
    const formattedMessage = messageFormatter`The values are x: ${x} and y: ${y}`;
    print(formattedMessage);
})();
