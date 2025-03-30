 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function advancedFeatureDemo() {
    print('Starting advanced feature demo...');

     
    const person = { name: 'Alice', age: 30, job: 'Developer' };
    const { name, ...otherDetails } = person;
    print(`Name: ${name}`);
    print(`Other Details:`, otherDetails);

     
    const user = { profile: { email: null } };
    print(`User Email: ${user.profile?.email ?? 'Email not available'}`);

     
    (async () => {
        const { add } = await import('./mathUtils.js');
        print(`Addition: 2 + 3 = ${add(2, 3)}`);
    })();

     
    await delay(2000);
    print('Finished delay...');

     
    const numbers = [1, 2, 3, 4, 5];
    const squaredEvenNumbers = numbers
        .map(num => num * num)
        .filter(num => num % 2 === 0);
    print('Squared Even Numbers:', squaredEvenNumbers);

    const sum = numbers.reduce((acc, val) => acc + val, 0);
    print('Sum of Numbers:', sum);

    print('Advanced feature demo complete.');
}

 
advancedFeatureDemo();
