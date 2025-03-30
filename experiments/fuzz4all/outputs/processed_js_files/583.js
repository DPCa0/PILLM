 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(500);  
    return { name: "JavaScript", paradigms: ["event-driven", "functional", "imperative"] };
}

async function processData() {
    const { name, paradigms } = await fetchData();
    const [primaryParadigm, ...otherParadigms] = paradigms;

    const dataHandler = {
        get: (obj, prop) => {
            if (prop === 'description') {
                return `${obj.name} is primarily ${primaryParadigm}, with additional paradigms such as ${otherParadigms.join(", ")}.`;
            }
            return obj[prop];
        }
    };

    const proxiedData = new Proxy({ name, primaryParadigm, otherParadigms }, dataHandler);

    print(proxiedData.description);
}

processData();
