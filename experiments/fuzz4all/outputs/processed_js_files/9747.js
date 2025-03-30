 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* createTaskSequence() {
    yield delay(1000).then(() => print("Task 1 completed after 1 second"));
    yield delay(2000).then(() => print("Task 2 completed after 2 seconds"));
    yield delay(1000).then(() => print("Task 3 completed after 1 second"));
}

 
async function runTasks(taskGenerator) {
    const tasks = taskGenerator();
    for (const task of tasks) {
        await task;
    }
    print("All tasks completed");
}

 
const user = {
    name: "John Doe",
    age: 30,
};

const userProxy = new Proxy(user, {
    get(target, property) {
        print(`Getting ${property}...`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        if (property === "age" && typeof value !== "number") {
            throw new TypeError("Age must be a number");
        }
        target[property] = value;
        return true;
    },
});

 
try {
    print(userProxy.name);   
    userProxy.age = 31;            
    print(userProxy.age);
    userProxy.age = "invalid";     
} catch (e) {
    console.error(e.message);
}

 
runTasks(createTaskSequence);
