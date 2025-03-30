 
async function complexFeature() {
   
  const dataMap = new Map([
    ['id1', { name: 'Alice', age: 30 }],
    ['id2', { name: 'Bob', age: 25 }],
    ['id3', { name: 'Charlie', age: 35 }]
  ]);

   
  const transformedData = Array.from(dataMap, ([id, userInfo]) => ({
    ...userInfo,
    id,
    seniority: userInfo.age > 30 ? 'Senior' : 'Junior'
  }));

   
  const UNIQUE_KEY = Symbol('uniqueKey');
  transformedData.forEach(item => {
    item[UNIQUE_KEY] = `Unique-${item.id}`;
  });

   
  const filterBySeniority = (level, ...users) => {
    return users.filter(({ seniority }) => seniority === level);
  };

   
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve(transformedData), 1000));
  const fetchedData = await fetchData();

   
  for (const [key, value] of Object.entries(fetchedData)) {
    print(`User ${key}: ${JSON.stringify(value, null, 2)}`);
  }

   
  const userToInspect = fetchedData[0];
  if (Reflect.has(userToInspect, 'name')) {
    Reflect.set(userToInspect, 'name', 'Updated Name');
  }
  print(`After update: ${JSON.stringify(userToInspect, null, 2)}`);
}

 
complexFeature().catch(console.error);
