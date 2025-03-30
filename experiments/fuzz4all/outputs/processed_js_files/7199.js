(async () => {
     
    const sumOfSquares = ({ x, y, ...rest }) => 
        Object.values(rest).reduce((acc, num) => acc + num * num, x * x + y * y);

     
    const asyncSquare = async (num) => {
        return new Promise(resolve => setTimeout(() => resolve(num * num), 100));
    };

    const calculateAndPrint = async (...numbers) => {
        const promises = numbers.map(num => asyncSquare(num));
        const squaredNumbers = await Promise.all(promises);
        
         
        const logResults = (strings, ...values) => {
            return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
        };

        print(logResults`Squared Numbers: ${squaredNumbers}`);

         
        const total = squaredNumbers.reduce((acc, val) => acc + val, 0);
        print(logResults`Sum of Squares: ${total}`);
    };

     
    const target = {};
    const handler = {
        get: (obj, prop) => prop in obj ? obj[prop] : `Property "${prop}" doesn't exist`,
        set: (obj, prop, value) => {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };
    const proxy = new Proxy(target, handler);

    proxy.value1 = 10;
    print(proxy.value1);
    print(proxy.unknownProperty);

    // Using Set to store unique numbers
    const numberSet = new Set([1, 2, 3, 4, 5, 5, 4]);
    await calculateAndPrint(...numberSet);

    // Using Symbol to create a unique property
    const uniqueId = Symbol('id');
    proxy[uniqueId] = 12345;
    print(`Unique ID: ${proxy[uniqueId]}`);
})();
