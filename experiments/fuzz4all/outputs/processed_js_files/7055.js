 

 
const asyncOperation = () => new Promise((resolve) => setTimeout(() => resolve('Data fetched'), 1000));

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return target[prop];
        } else {
            return 'Property not found';
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

let dataObject = { name: 'Initial' };
const proxyData = new Proxy(dataObject, handler);

const processData = async () => {
     
    let data = await asyncOperation();
    print(data);

     
    print(proxyData.name);   
    proxyData.name = 'Updated';    
    print(proxyData.name);   

     
    const numbers = [1, 2, 3, 4, 5];
    const doubleNumbers = numbers.map(num => num * 2);
    const sum = doubleNumbers.reduce((acc, num) => acc + num, 0);

    print('Doubled Numbers:', doubleNumbers);
    print('Sum of Doubled Numbers:', sum);
};

 
processData().catch(console.error);
