 
const fetchUserData = async (userId) => {
     
    const response = await fetch(`https: 
    const user = await response.json();

     
    const { name, email, address: { city } } = user ?? {};

     
    const posts = await fetch(`https: 
                          .then(res => res.json());

     
    const uniqueTitles = [...new Set(posts.map(post => post.title))];

     
    const handler = {
        get: function(target, prop) {
            return prop in target ? target[prop] : 'Property not found';
        }
    };
    const proxyUser = new Proxy({ name, email, city, uniqueTitles }, handler);

     
    function formatUserData(strings, name, email, city) {
        return `${strings[0]}${name}${strings[1]}${email}${strings[2]}${city}`;
    }

    print(formatUserData`Name: ${proxyUser.name}, Email: ${proxyUser.email}, City: ${proxyUser.city}`);

     
    for (const title of proxyUser.uniqueTitles) {
        print(`Title: ${title}`);
    }
};

 
(async () => {
    try {
        await fetchUserData(1);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
})();
