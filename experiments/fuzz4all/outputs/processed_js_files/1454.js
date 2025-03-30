 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncSequence() {
    const data = ['Alpha', 'Bravo', 'Charlie'];
    
     
    function* generator() {
        for (let item of data) {
            yield delay(1000).then(() => print(item));
        }
    }

     
    for (let promise of generator()) {
        await promise;
    }
}

 
const handler = {
    apply: async function(target, thisArg, argumentsList) {
        print('Sequence started...');
        await target.apply(thisArg, argumentsList);
        print('Sequence finished!');
    }
};

const proxiedAsyncSequence = new Proxy(asyncSequence, handler);

 
proxiedAsyncSequence();
