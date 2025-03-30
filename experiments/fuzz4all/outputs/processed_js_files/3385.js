 

function* generatorFunction() {
    yield 'Hello,';
    yield 'world!';
}

async function asyncGenerator(g) {
    const gen = g();
    let result = gen.next();

    while (!result.done) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        print(result.value);
        result = gen.next();
    }
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Fetched data from ${url}`);
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

async function main() {
    await asyncGenerator(generatorFunction);

    try {
        const data = await fetchData('https://example.com');
        print(data);
    } catch (error) {
        console.error(error);
    }
}

main();
