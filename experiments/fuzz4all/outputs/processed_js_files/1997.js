 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
(async function() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const response = await fetch(apiUrl);
    const data = await response.json();

     
    const titles = [...data.slice(0, 5).map(post => post.title)];

     
    for (const title of titles) {
        print(`Fetched title: ${title}`);
        await delay(1000);
    }

     
    const fibSequence = [...fibonacci(100)];
    print('Fibonacci sequence up to 100:', fibSequence);

     
    if (typeof document !== 'undefined') {
        const outputDiv = document.createElement('div');
        outputDiv.innerHTML = `
            <h2>Post Titles:</h2>
            <ul>${titles.map(title => `<li>${title}</li>`).join('')}</ul>
            <h2>Fibonacci Sequence:</h2>
            <p>${fibSequence.join(', ')}</p>
        `;
        document.body.appendChild(outputDiv);
    }
})();
