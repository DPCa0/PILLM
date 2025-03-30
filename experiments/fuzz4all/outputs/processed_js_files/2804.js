 
async function complexFeatureDemo() {
     
    const fetchData = () => new Promise(resolve => setTimeout(() => {
        resolve({
            user: {
                name: 'Jane Doe',
                age: 28,
                location: {
                    city: 'New York',
                    country: 'USA'
                }
            },
            preferences: {
                theme: 'dark',
                notifications: true
            }
        });
    }, 1000));

     
    const data = await fetchData();

     
    const { user: { name, location: { city } }, preferences: { theme } } = data;

     
    const handler = {
        set(target, prop, value) {
            print(`Property ${prop} is being set to ${value}`);
            return Reflect.set(target, prop, value);
        }
    };

    const proxyUser = new Proxy(data.user, handler);

     
    print(`User: ${name}, City: ${city}, Theme: ${theme}`);

     
    proxyUser.name = 'John Smith';
    proxyUser.location.city = 'Los Angeles';

     
    print(`Updated User: ${proxyUser.name}, Updated City: ${proxyUser.location.city}`);
}

complexFeatureDemo();
