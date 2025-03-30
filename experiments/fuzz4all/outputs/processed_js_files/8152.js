 
async function fetchData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();

         
        let titles = data.map(post => post.title);

         
        let uniqueTitles = [...new Set(titles)];

         
        console.log({
            postCount: data.length,
            uniqueTitleCount: uniqueTitles.length,
            sampleTitles: uniqueTitles.slice(0, 5)
        });

         
        let commentsPromises = Array.from({ length: 5 }, (_, i) => 
            fetch(`https: 
            .then(res => res.json())
        );

        let commentsArray = await Promise.all(commentsPromises);

         
        let allComments = commentsArray.flatMap(comments => comments);

         
        function* commentIterator(comments) {
            for (let comment of comments) {
                yield comment;
            }
        }

        let iterator = commentIterator(allComments);
        print('First 3 comments using generator:');
        print(iterator.next().value);
        print(iterator.next().value);
        print(iterator.next().value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
fetchData();
