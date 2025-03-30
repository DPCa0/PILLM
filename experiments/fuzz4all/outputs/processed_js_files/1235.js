 
import fetch from 'node-fetch';

 
(async function fetchDataAndProcess() {
    try {
         
        const urls = [
            'https://api.github.com/users/octocat',
            'https://api.github.com/users/defunkt'
        ];
        
        const requests = urls.map(url => fetch(url));
        const responses = await Promise.allSettled(requests);

         
        const data = await Promise.all(
            responses.map(async response => {
                if (response.status === "fulfilled") {
                    return response.value.json();
                } else {
                    return { error: 'Failed to fetch data' };
                }
            })
        );

         
        data.forEach(user => {
            const name = user?.name ?? 'Unknown User';
            const company = user?.company ?? 'No Company';
            print(`Name: ${name}, Company: ${company}`);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
const target = {
    message1: "hello",
    message2: "everyone",
};

const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 'Property does not exist';
    },
};

const proxy = new Proxy(target, handler);

print(proxy.message1);   
print(proxy.message3);   

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
for (const value of gen) {
    print(value);   
}
