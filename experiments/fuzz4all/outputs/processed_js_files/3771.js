Certainly! Here's a JavaScript program that demonstrates the use of advanced features such as Promises, async/await, generators, and the spread/rest operator:

 
function* numberGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
const fetchData = async (number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Fetched data for number: ${number}`);
        }, 1000);
    });
};

 
const processNumbers = async (count) => {
    const gen = numberGenerator();
    let results = [];
    
    for (let i = 0; i < count; i++) {
        const number = gen.next().value;
         
        const data = await fetchData(number);
        results.push(data);
    }
    
    return results;
};

 
const logResults = (...results) => {
    results.forEach((result, index) => print(`Result ${index + 1}: ${result}`));
};

 
processNumbers(5).then((results) => logResults(...results));

This program uses a generator to produce an infinite series of numbers, simulates fetching data asynchronously for each number, and then logs the results using the spread operator. It showcases a combination of modern JavaScript features in a complex yet coherent manner.