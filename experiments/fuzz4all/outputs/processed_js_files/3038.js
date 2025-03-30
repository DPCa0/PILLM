class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    static fromArray(arr) {
        return new Observable((observer) => {
            arr.forEach((item) => observer.next(item));
            observer.complete();
        });
    }

    map(fn) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (val) => observer.next(fn(val)),
                complete: () => observer.complete(),
            });
        });
    }

    filter(fn) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (val) => fn(val) && observer.next(val),
                complete: () => observer.complete(),
            });
        });
    }

    subscribe(observer) {
        this._subscribe(observer);
    }
}

const numbers = Observable.fromArray([1, 2, 3, 4, 5]);

numbers
    .map((x) => x * 2)
    .filter((x) => x > 5)
    .subscribe({
        next: (val) => console.log('Value:', val),
        complete: () => console.log('Done'),
    });

 
 
 
 
