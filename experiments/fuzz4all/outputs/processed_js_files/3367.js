 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexFlow() {
    print('Starting complex flow...');
    
     
    const target = { data: 'Initial data' };
    
    const handler = {
        get: (obj, prop) => {
            print(`Getting property: ${prop}`);
            return Reflect.get(obj, prop);
        },
        set: (obj, prop, value) => {
            print(`Setting property: ${prop} to ${value}`);
            return Reflect.set(obj, prop, value);
        }
    };
    
    const proxy = new Proxy(target, handler);

     
    print(proxy.data);
    proxy.data = 'Updated data';
    print(proxy.data);

     
    await delay(2000);
    print('API request completed');

     
    const nums = [1, 2, 3];
    const asyncDouble = async num => num * 2;
    const doubledNums = await Promise.all(nums.map(asyncDouble));

    print('Doubled numbers:', doubledNums);
    
    print('Complex flow finished.');
}

 
complexFlow();
