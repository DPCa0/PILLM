 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

 
function reactive(target) {
    return new Proxy(target, {
        set(obj, prop, value) {
            print(`Property ${prop} set to ${value}`);
            obj[prop] = value;
            render(obj);  
            return true;
        }
    });
}

 
function* numberStream(numbers, transform) {
    for (const number of numbers) {
        yield transform(number);
    }
}

 
function render(state) {
    console.clear();
    print("Current Data:", state.data);
    print("Transformed Stream:", [...state.transformedStream]);
}

 
async function main() {
    const state = reactive({
        data: [],
        transformedStream: []
    });

    try {
         
        state.data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        
         
        const transform = num => num * 2;
        const numbers = [1, 2, 3, 4, 5];
        const generator = numberStream(numbers, transform);
        
        for (const num of generator) {
            state.transformedStream.push(num);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

main();
