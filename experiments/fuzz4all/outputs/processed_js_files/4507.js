 

 
function asyncTask(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

 
async function* messageGenerator() {
    yield "Fetching data...";
    await asyncTask(1000);
    yield "Processing data...";
    await asyncTask(1000);
    yield "Data processed successfully.";
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

const data = new Proxy({ info: "Sensitive Data" }, handler);

 
async function processMessages() {
    const gen = messageGenerator();
    for await (const message of gen) {
        print(message);
    }
}

 
(async function execute() {
    await processMessages();
    print("Retrieved:", data.info);
})();
