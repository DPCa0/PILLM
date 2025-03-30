 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async function advancedJavaScriptShowcase() {
     
    const numbers = [1, 2, 3, 4, 5];
    const [first, second, ...rest] = numbers;
    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

     
    const squares = numbers.map(num => num ** 2);
    print(`Squares: ${squares}`);

     
    const duplicatesArray = [1, 2, 2, 3, 4, 4, 5];
    const uniqueNumbers = [...new Set(duplicatesArray)];
    print(`Unique Numbers: ${uniqueNumbers}`);

     
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const combinedObj = { ...obj1, ...obj2, d: 5, ['e' + 1]: 6 };
    print('Combined Object:', combinedObj);

     
    const handler = {
        get(target, prop) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
    };
    const proxyObj = new Proxy(combinedObj, handler);
    print(proxyObj.a);  

     
    print('Waiting for 2 seconds...');
    await delay(2000);
    print('Done waiting!');

     
    function* numberGenerator() {
        let num = 1;
        while (true) {
            yield num++;
        }
    }
    const gen = numberGenerator();
    print('Generated Numbers:', gen.next().value, gen.next().value, gen.next().value);

     
    const getCoordinates = () => [100, 200];
    const [x, y] = getCoordinates();
    print(`Coordinates: X=${x}, Y=${y}`);

     
    const sym = Symbol('unique');
    const objWithSymbol = { [sym