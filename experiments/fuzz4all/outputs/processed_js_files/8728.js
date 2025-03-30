 
const fetchRandomUser = () => {
    return fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => data.results[0]);
};

 
async function displayRandomUser() {
    try {
        const user = await fetchRandomUser();
        const { name: { first, last }, email, location: { city, country } } = user;
        
         
        print(`Name: ${first} ${last}`);
        print(`Email: ${email}`);
        print(`Location: ${city}, ${country}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
class UserCounter {
    constructor() {
        this.counts = {};
    }

     
    incrementUserType(type) {
        this.counts[type] = (this.counts[type] || 0) + 1;
    }

    logCounts() {
        console.table(this.counts);
    }
}

 
(function showUsers() {
    const userCounter = new UserCounter();
    let types = ['regular', 'admin', 'guest'];

    const display = async () => {
        await displayRandomUser();
        const randomType = types[Math.floor(Math.random() * types.length)];
        userCounter.incrementUserType(randomType);
        userCounter.logCounts();
        setTimeout(display, 5000);  
    };

    display();
})();
