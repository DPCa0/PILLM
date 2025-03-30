 
const fetchData = async (url) => {
    try {
         
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

         
        let data = await response.json();

         
        const { title, body } = data;
        
         
        print(`Title: ${title}`);
        print(`Body: ${body}`);
    } catch (error) {
         
        console.error(`Fetch error: ${error.message}`);
    }
};

 
function* taskGenerator(tasks) {
    for (const task of tasks) {
        yield `Processing task: ${task}`;
    }
}

 
const tasks = ["Task 1", "Task 2", "Task 3"];
const processedTasks = tasks.map(task => `Completed: ${task}`);
processedTasks.forEach(task => print(task));

 
const handler = {
    get: (target, property) => {
        print(`Accessed property: ${property}`);
        return property in target ? target[property] : `Property ${property} not found.`;
    }
};

const targetObject = { key1: "value1", key2: "value2" };
const proxy = new Proxy(targetObject, handler);

 
print(proxy.key1);
print(proxy.key3);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

const generator = taskGenerator(processedTasks);
for (let task of generator) {
    print(task);
}
