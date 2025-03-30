 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    const urls = ['https://api1.example.com/data', 'https://api2.example.com/data', 'https://api3.example.com/data'];
    
    try {
        const results = await Promise.all(urls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }));
        
        print('Fetched data:', results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
class Shape {
    constructor(name) {
        this.name = name;
    }
    
    display() {
        print(`This is a ${this.name}.`);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
    
    display() {
        super.display();
        print(`Its area is ${this.area().toFixed(2)}.`);
    }
}

 
const circleHandler = {
    get: function(target, property, receiver) {
        print(`Getting property '${property}'`);
        return Reflect.get(target, property, receiver);
    }
};

const myCircle = new Circle(5);
const proxiedCircle = new Proxy(myCircle, circleHandler);

 
const { name, radius } = proxiedCircle;
print(name, radius);
proxiedCircle.display();

 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const highlightedText = highlight`The radius of the circle is ${radius} and its name is ${name}.`;
print(highlightedText);

 
fetchData();
