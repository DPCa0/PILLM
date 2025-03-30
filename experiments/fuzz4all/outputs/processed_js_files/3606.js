 
const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
};

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Property "${prop}" accessed`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const iterableObject = {
    *[Symbol.iterator]() {
        yield 'Welcome';
        yield 'to';
        yield 'Advanced';
        yield 'JavaScript';
    }
};

 
const processData = ({ name, age, ...otherProps }) => {
    return { name: `Name: ${name}`, age: `Age: ${age}`, details: otherProps };
};

 
(async () => {
    const dataURL = 'https://api.example.com/data';
    const rawData = await fetchData(dataURL);

    const enhancedData = new Proxy(processData({ name: 'John Doe', age: 30, location: 'Earth' }), handler);

    const [first, ...rest] = iterableObject;
    print(first);  
    print(rest);   

    for (const word of iterableObject) {
        print(word);   
    }

    print(enhancedData.name);   
    print(enhancedData.age);    

     
    print({ ...enhancedData });

     
    const sum = (...nums) => nums.reduce((total, num) => total + num, 0);
    print(sum(1, 2, 3, 4, 5));   
})();
