 
async function advancedFeatureDemo() {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
     
    const promises = [delay(1000).then(() => 'Task 1 Complete'), delay(500).then(() => 'Task 2 Complete'), delay(1500).then(() => 'Task 3 Complete')];
    
     
    const [task1, task2, task3] = await Promise.all(promises);
    
     
    print(task1, task2, task3);

     
    const nestedObject = {
        user: {
            name: 'Alice',
            details: {
                age: 30,
                location: 'Wonderland'
            }
        }
    };

     
    const { user: { name, details: { age, location } } } = nestedObject;

     
    print(`${name}, aged ${age}, lives in ${location}.`);

     
    const extras = ['Extra 1', 'Extra 2'];
    const allTasks = [...promises, ...extras];
    
     
    print('All tasks including extras:', allTasks);
}

 
advancedFeatureDemo();
