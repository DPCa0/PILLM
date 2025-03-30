 
const ComplexModule = (function() {
     

     
    const data = [1, 2, 3, 4, 5];

    const privateDouble = num => num * 2;

     
    return {
        processData: function() {
             
            return data
                .map(privateDouble)  
                .filter(num => num > 5)  
                .reduce((acc, num) => acc + num, 0);  
        },
        async fetchData: async function(url) {
             
            try {
                let response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                let jsonData = await response.json();

                 
                const { title, body } = jsonData;
                print(`Title: ${title}\nBody: ${body}`);

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
    };
})();

 
print('Processed Data:', ComplexModule.processData());
ComplexModule.fetchData('https://jsonplaceholder.typicode.com/posts/1');
