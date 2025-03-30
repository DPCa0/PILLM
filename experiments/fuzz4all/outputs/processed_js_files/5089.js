class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
    
    subscribe(observer) {
        return this._subscribe(observer);
    }
    
    static from(array) {
        return new Observable((observer) => {
            array.forEach(item => observer.next(item));
            observer.complete();
        });
    }
    
    map(transform) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (value) => observer.next(transform(value)),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
    }
    
    filter(predicate) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (value) => {
                    if (predicate(value)) observer.next(value);
                },
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
    }
    
    reduce(accumulator, initialValue) {
        let accumulation = initialValue;
        return new Observable((observer) => {
            return this.subscribe({
                next: (value) => {
                    accumulation = accumulator(accumulation, value);
                },
                error: (err) => observer.error(err),
                complete: () => {
                    observer.next(accumulation);
                    observer.complete();
                }
            });
        });
    }
}

const array = [1, 2, 3, 4, 5];

Observable.from(array)
    .map(x => x * 2)
    .filter(x => x > 5)
    .reduce((acc, x) => acc + x, 0)
    .subscribe({
        next: value => console.log('Result:', value),
        error: err => console.error('Error:', err),
        complete: () => console.log('Completed')
    });
