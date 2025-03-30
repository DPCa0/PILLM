 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ user: 'Alice', score: 42 }), 1000);
});

 
function* asyncFlow() {
    print('Starting data fetching...');
    const { user, score } = yield fetchData();
    return `User: ${user}, Score: ${score}`;
}

 
async function handleGenerator(gen) {
    const iterator = gen();
    let result = iterator.next();
    while (!result.done) {
        const value = await result.value;
        result = iterator.next(value);
    }
    return result.value;
}

 
const defaultSettings = { theme: 'dark', language: 'en' };
const userSettings = { language: 'fr' };
const finalSettings = { ...defaultSettings, ...userSettings };

 
(async () => {
    const message = await handleGenerator(asyncFlow);
    print(message);

    print(`Final settings: Theme - ${finalSettings.theme}, Language - ${finalSettings.language}`);
})();
