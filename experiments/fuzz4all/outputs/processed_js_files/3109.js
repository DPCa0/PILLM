 
const delay = ms => new Promise(res => setTimeout(res, ms));

async function* dataStream() {
    const dataChunks = [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
        { id: 3, value: 'C' }
    ];

    for (const chunk of dataChunks) {
        await delay(1000);
        yield chunk;
    }
}

(async () => {
    for await (const { id, value } of dataStream()) {
        print(`Received chunk: ID=${id}, Value=${value}`);
    }

     
    const transformedData = [...Array(10).keys()].map(num => num ** 2);
    print('Transformed Data:', transformedData);

     
    const uniqueValues = new Set(transformedData.filter(x => x % 2 === 0));
    const mapValues = new Map([...uniqueValues].map(x => [x, `SquareRoot: ${Math.sqrt(x)}`]));

    mapValues.forEach((description, key) => {
        print(`Number: ${key}, Description: ${description}`);
    });
})();
