class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
    
    subscribe(observer) {
        return this._subscribe(observer);
    }
    
    map(transform) {
        return new Observable(observer => 
            this.subscribe({
                next: value => observer.next(transform(value)),
                error: err => observer.error(err),
                complete: () => observer.complete()
            })
        );
    }
    
    filter(predicate) {
        return new Observable(observer => 
            this.subscribe({
                next: value => {
                    if (predicate(value)) observer.next(value);
                },
                error: err => observer.error(err),
                complete: () => observer.complete()
            })
        );
    }
}

 
function createInterval(intervalTime) {
    return new Observable(observer => {
        let count = 0;
        const intervalId = setInterval(() => {
            observer.next(count++);
        }, intervalTime);

        return () => clearInterval(intervalId);
    });
}

 
const numbers = createInterval(1000);

const subscription = numbers
    .map(num => num * 2)
    .filter(num => num % 3 === 0)
    .subscribe({
        next: value => console.log(`Received: ${value}`),
        error: err => console.error(err),
        complete: () => console.log('Completed')
    });

 
setTimeout(() => subscription(), 10000);
