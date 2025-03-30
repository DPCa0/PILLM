class Task {
    constructor(title) {
        this.title = title;
        this.done = false;
    }
    
    toggle() {
        this.done = !this.done;
    }
}

const taskHandler = {
    get: (obj, prop) => prop in obj ? obj[prop] : "Property does not exist",
    set: (obj, prop, value) => {
        if (prop === 'title' && typeof value === 'string') {
            obj[prop] = value;
            return true;
        } else if (prop === 'done' && typeof value === 'boolean') {
            obj[prop] = value;
            return true;
        } else {
            throw new Error(`Cannot set property ${prop}`);
        }
    }
};

const tasks = new Proxy([], {
    get: (array, prop) => {
        if (prop === 'completed') {
            return array.filter(task => task.done);
        }
        return Reflect.get(array, prop);
    },
    set: (array, prop, value) => Reflect.set(array, prop, new Proxy(new Task(value), taskHandler)),
});

tasks.push("Learn Proxies");
tasks.push("Build a Project");

tasks[0].toggle();

print(tasks.completed.map(task => task.title));  
print(tasks[1].title);  
tasks[1].title = "Complete Project";
print(tasks[1].title);  
