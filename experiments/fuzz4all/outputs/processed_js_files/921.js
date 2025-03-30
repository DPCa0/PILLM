 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);  
    const data = { title: 'Advanced JavaScript', author: 'CodeMaster' };
    print('Data fetched');
    return data;
}

 
function* processSteps(data) {
    print('Starting processing steps...');
    yield `Step 1: Received ${data.title}`;
    yield `Step 2: Author is ${data.author}`;
    yield `Step 3: Processing complete`;
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

 
const proxyData = new Proxy({}, handler);

async function runProgram() {
    try {
        const url = 'https://api.example.com/data';
        const data = await fetchData(url);

         
        const steps = processSteps(data);
        for (const step of steps) {
            print(step);
        }

         
        proxyData.info = data;
        print(`Title accessed via proxy: ${proxyData.info.title}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
runProgram();
