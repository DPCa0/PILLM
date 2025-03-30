class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    static fromEvent(element, event) {
        return new Observable(observer => {
            const handler = e => observer.next(e);
            element.addEventListener(event, handler);
            
             
            return () => element.removeEventListener(event, handler);
        });
    }

    subscribe(observer) {
        const cleanup = this._subscribe(observer);
        return typeof cleanup === 'function' ? { unsubscribe: cleanup } : { unsubscribe: () => {} };
    }

    pipe(...operators) {
        return operators.reduce((prevObservable, operator) => operator(prevObservable), this);
    }
}

const map = transformFn => observable => new Observable(observer => {
    return observable.subscribe({
        next: value => observer.next(transformFn(value))
    });
});

const filter = predicate => observable => new Observable(observer => {
    return observable.subscribe({
        next: value => predicate(value) && observer.next(value)
    });
});

 
const button = document.querySelector('button');

 
const clicks$ = Observable.fromEvent(button, 'click');

 
const processedClicks$ = clicks$.pipe(
    map(event => event.clientX),
    filter(x => x % 2 === 0)
);

 
const subscription = processedClicks$.subscribe({
    next: x => console.log(`Clicked at an even X-coordinate: ${x}`)
});

 
setTimeout(() => {
    subscription.unsubscribe();
    print('Unsubscribed from clicks.');
}, 10000);
