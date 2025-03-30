 
(async () => {
     
    const fetchData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ data: 'Hello, complex world!' }), 1000);
        });
    };

     
    const processData = async () => {
        const response = await fetchData();
        const message = response?.data ?? 'No data available';
        return message;
    };

     
    const [messageModule, { default: fs }] = await Promise.all([
        import('./messageFormatter.js'),  
        import('fs/promises'),  
    ]);

     
    const formattedMessage = messageModule.format(await processData());

     
    const highlight = (strings, ...values) => 
        strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');

    print(highlight`Message received: ${formattedMessage}`);

     
    try {
        await fs.writeFile('output.txt', formattedMessage);
        print('Message saved to output.txt');
    } catch (err) {
        console.error('Error writing file:', err);
    }
})();
