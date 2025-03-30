 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
const fetchData = (delay, data) => new Promise(resolve => setTimeout(() => resolve(data), delay));

 
async function processData(gen, fetchFunc) {
    const { value: startValue } = gen.next();
    print(`Starting from: ${startValue}`);

     
    const [data1, data2] = await Promise.all([
        fetchFunc(1000, 'Data1'),
        fetchFunc(1500, 'Data2')
    ]);

    print(`Fetched data: ${data1}, ${data2}`);

    const { value: nextValue } = gen.next();
    print(`Next value from generator: ${nextValue}`);

    const data3 = await fetchFunc(500, 'Data3');
    print(`Finally fetched: ${data3}`);
}

 
const genInstance = numberGenerator();
const [first, second, third] = [genInstance.next().value, genInstance.next().value, genInstance.next().value];
print(`Destructured numbers: ${first}, ${second}, ${third}`);

 
processData(genInstance, fetchData);
