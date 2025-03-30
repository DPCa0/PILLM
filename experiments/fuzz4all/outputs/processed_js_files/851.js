class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        return this._subscribe(observer);
    }

    static fromEvent(el, event) {
        return new Observable(observer => {
            const handler = e => observer.next(e);
            el.addEventListener(event, handler);
            return {
                unsubscribe: () => el.removeEventListener(event, handler)
            };
        });
    }

    map(fn) {
        return new Observable(observer => {
            return this.subscribe({
                next: val => observer.next(fn(val))
            });
        });
    }

    filter(predicate) {
        return new Observable(observer => {
            return this.subscribe({
                next: val => predicate(val) ? observer.next(val) : undefined
            });
        });
    }
}

 
const clickObservable = Observable.fromEvent(document, 'click')
    .map(e => ({ x: e.clientX, y: e.clientY }))
    .filter(pos => pos.x < window.innerWidth / 2);

const subscription = clickObservable.subscribe({
    next: pos => console.log(`Clicked on left side: (${pos.x}, ${pos.y})`)
});

 
setTimeout(() => subscription.unsubscribe(), 10000);
