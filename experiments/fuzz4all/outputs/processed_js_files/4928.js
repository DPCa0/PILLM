 

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

 
async function fetchData(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data for number ${number}`);
        }, 1000);
    });
}

 
const dataHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            console.error(`Property ${property} not found`);
            return null;
        }
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    },
};

 
async function main() {
    const numbers = numberGenerator();
    const data = new Proxy({}, dataHandler);
    
    for (let i = 0; i < 5; i++) {
        const number = numbers.next().value;
        const response = await fetchData(number);
        data[number] = response;
    }

    print(data[1]);
    print(data[3]);
    print(data[5]);
    print(data[10]);   
}

main();
