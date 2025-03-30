 
(async () => {
    const { promises: fs } = await import('fs');
    const fileName = './complexData.json';

     
    const manipulateData = ({ title, ...rest }, ...newItems) => ({
        title: title.toUpperCase(),
        items: [...new Set([...rest.items, ...newItems])]
    });

     
    const main = async () => {
        try {
             
            const data = JSON.parse(await fs.readFile(fileName, 'utf-8'));
            
             
            const modifiedData = manipulateData(data ?? {}, 'item4', 'item5');

             
            await fs.writeFile(fileName, JSON.stringify(modifiedData, null, 2), 'utf-8');
            print(`Data written to ${fileName}`);
        } catch (error) {
             
            console.error(`Error: ${error.message}`);
        }
    };

     
    const taggedLogger = (strings, ...values) => {
        return strings.raw.reduce((result, str, i) => result + str + (values[i] || ''), '');
    };

    print(taggedLogger`Starting the process at ${new Date().toLocaleTimeString()}`);

    main();
})();
