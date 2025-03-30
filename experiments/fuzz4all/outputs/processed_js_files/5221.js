 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: "John Doe", age: 30, location: "New York" };
            resolve(data);
        }, 1000);
    });
};

 
async function getUserData() {
    try {
        const { user, age, location } = await fetchData();
        
         
        print(`User: ${user}, Age: ${age}, Location: ${location}`);
        
         
        const displayInfo = (user, age, location) => 
            `Welcome ${user}, aged ${age}, located in ${location}`;
        
         
        print(displayInfo(user, age, location));
        
         
        const scores = [90, 85, 88];
        const [score1, score2, score3] = scores;
        print(`Scores: ${score1}, ${score2}, ${score3}`);

         
        const newScores = [...scores, 95, 92];
        print(`Updated Scores: ${newScores.join(', ')}`);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
getUserData();
