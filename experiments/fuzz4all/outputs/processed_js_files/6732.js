const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const processData = async (url) => {
    const data = await fetchData(url);
    if (!data) return;

    const [first, second, ...rest] = data.items;
    const transformed = rest.map(({ id, name, details: { info } }) => ({
        id,
        name: name.toUpperCase(),
        info: info.split(' ').reverse().join(' ')
    }));

    const sorted = transformed.sort((a, b) => a.id - b.id);

    for (const { id, name, info } of sorted) {
        print(`ID: ${id} - Name: ${name} - Info: ${info}`);
    }

    const sumId = sorted.reduce((acc, { id }) => acc + id, 0);
    print(`Sum of IDs: ${sumId}`);
};

processData('https://api.example.com/data');
