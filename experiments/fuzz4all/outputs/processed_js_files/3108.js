 
(async () => {
    const { promises: fs } = await import('fs');

     
    const defaultSettings = {
        theme: 'dark',
        notifications: true,
        fontSize: 14
    };

    const handler = {
        get: (target, property) => {
            return property in target ? target[property] : `Default: ${defaultSettings[property]}`;
        },
        set: (target, property, value) => {
            if (property in defaultSettings) {
                target[property] = value;
                print(`Setting updated: ${property} = ${value}`);
            } else {
                throw new Error(`Invalid setting: ${property}`);
            }
            return true;
        }
    };

    const userSettings = new Proxy({}, handler);

     
    try {
        const data = await fs.readFile('./settings.json', 'utf-8');
        const settings = JSON.parse(data);

        for (let key in settings) {
            userSettings[key] = settings[key];
        }

        print(`Current Settings: ${JSON.stringify(userSettings)}`);

         
        userSettings.fontSize = 16;

         
        await Promise.all([
            fs.writeFile('./settings.json', JSON.stringify(userSettings, null, 2)),
            new Promise((resolve) => setTimeout(resolve, 1000))
        ]);

        print('Settings saved and additional async operation completed.');
    } catch (error) {
        console.error('Error reading/writing settings:', error);
    }
})();
