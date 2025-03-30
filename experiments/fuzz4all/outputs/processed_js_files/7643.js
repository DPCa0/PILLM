 

 
const fetchData = () => new Promise(resolve => setTimeout(() => {
    resolve({ name: "Alice", age: 30, location: { city: "Wonderland", zip: 12345 } });
}, 1000));

 
const processLocation = (city, zip) => new Promise(resolve => setTimeout(() => {
    resolve(`Processed location: ${city}, Zip: ${zip}`);
}, 1000));

 
(async function main() {
    try {
         
        const { name, age, location } = await fetchData();

         
        const user = { ...location, name, age };

         
        const greetUser = ({ name, age }) => `Hello, ${name}! You are ${age} years old.`;

        print(greetUser(user));

         
        const locationInfo = await processLocation(user.city, user.zip);
        print(locationInfo);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
