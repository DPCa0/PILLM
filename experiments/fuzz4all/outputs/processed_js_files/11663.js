 
async function getRandomCatFact() {
    try {
         
        const response = await fetch('https://meowfacts.herokuapp.com/');
        if (!response.ok) throw new Error('Failed to fetch data');

         
        const { data: [catFact] } = await response.json();

         
        return new Promise(resolve => resolve(`🐱 Cat Fact: ${catFact}`));
    } catch (error) {
        return Promise.reject('Error: ' + error.message);
    }
}

(async function displayCatFact() {
    try {
        const catFactMessage = await getRandomCatFact();
        print(catFactMessage);
    } catch (error) {
        console.error(error);
    }
})();
