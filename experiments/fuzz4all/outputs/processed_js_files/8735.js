 

 
function createCounter(initialCount = 0) {
    let count = initialCount;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const formatUser = ({ name, email }) => `Name: ${name}, Email: ${email}`;

 
(async () => {
    const counter = createCounter(10);
    print(`Initial count: ${counter.getValue()}`);  
    print(`Incremented count: ${counter.increment()}`);  

     
    const userData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    
    if (userData) {
        const userInfo = formatUser(userData);
        print(userInfo);  
    }
    
    print(`Decrementing count: ${counter.decrement()}`);  
})();
