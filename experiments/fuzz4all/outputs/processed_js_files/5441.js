 

 
const fakeAPI = (delay, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data ? resolve(data) : reject('Error: No Data');
        }, delay);
    });
};

 
const handleData = ({ name, age, location }) => {
    print(`Name: ${name}, Age: ${age}, Location: ${location}`);
};

 
const handler = {
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
        } else {
            print(`Failed to set ${prop}: ${value} is not a string`);
        }
    }
};

let userData = new Proxy({}, handler);

 
const fetchData = async () => {
    try {
        const data = await fakeAPI(1000, { name: 'Jane Doe', age: 28, location: 'New York' });
        handleData(data);

         
        userData.name = data.name;
        userData.age = data.age.toString();  
        userData.location = data.location;
    } catch (error) {
        console.error(error);
    }
};

 
(async () => {
    await fetchData();
})();
