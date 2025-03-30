 

 
const logProxy = (target) => new Proxy(target, {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
});

 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
};

 
(async () => {
     
    const settings = logProxy({ theme: 'dark', notifications: true });

     
    settings.theme = 'light';
    print(settings.notifications);

     
    const { theme = 'default', notifications = false } = settings;
    print(`Theme: ${theme}, Notifications: ${notifications}`);

     
    const urls = ['url1', 'url2', 'url3'];
    const promises = urls.map(url => fetchData(url));

    const results = await Promise.all(promises);
    print('Fetched Data:', results);

     
    const newUrls = [...urls, 'url4'];
    print('New URLs:', newUrls);
})();
