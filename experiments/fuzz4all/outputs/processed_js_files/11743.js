 
function htmlEscape(literals, ...placeholders) {
    let result = '';
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += String(placeholders[i]).replace(/&/g, '&amp;')
                                         .replace(/</g, '&lt;')
                                         .replace(/>/g, '&gt;')
                                         .replace(/"/g, '&quot;')
                                         .replace(/'/g, '&#39;');
    }
    result += literals[literals.length - 1];
    return result;
}

// Use async/await with Promise and Fetch API
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const user = await response.json();

        // Destructure the user data
        const { name, email, address: { city } } = user;

        // Use a template literal with a tagged template function for HTML safe output
        print(htmlEscape`User: ${name}, Email: ${email}, City: ${city}`);

        // Use a Set to ensure unique cities (advanced ES6 feature)
        uniqueCities.add(city);
    } catch (error) {
        console.error('Fetching user data failed:', error);
    }
}

// Use Map and Set for advanced data structures
const userMap = new Map();
const uniqueCities = new Set();

// Populate the Map with user fetch promises
for (let i = 1; i <= 5; i++) {
    userMap.set(i, fetchUserData(i));
}

// Retrieve and resolve all user data
Promise.all(userMap.values())
    .then(() => {
        print('Unique Cities:', [...uniqueCities].join(', '));
    });
