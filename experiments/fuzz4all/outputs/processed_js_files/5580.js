 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', tags: ['developer', 'javascript'] },
                { id: 2, name: 'Bob', tags: ['designer', 'photoshop'] },
                { id: 3, name: 'Charlie', tags: ['manager', 'agile'] },
            ]);
        }, 1000);
    });
};

 
const processData = async () => {
    try {
        const data = await fetchData();

         
        const tagSet = new Set();
        data.forEach(({ tags }) => tags.forEach(tag => tagSet.add(tag)));

         
        const nameTagMap = new Map();
        data.forEach(({ name, tags }) => nameTagMap.set(name, tags));

         
        const [firstPerson] = data;
        const { name: firstName, tags: firstTags } = firstPerson;

         
        print('Unique Tags:', [...tagSet]);
        print('Name and Tags Map:', Array.from(nameTagMap.entries()));
        print(`First Person: Name - ${firstName}, Tags - ${firstTags}`);
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

 
processData();
