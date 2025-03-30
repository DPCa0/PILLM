class LazyEvaluator {
    constructor(computation) {
        this.computation = computation;
        this.result = undefined;
        this.executed = false;
    }

    evaluate() {
        if (!this.executed) {
            this.result = this.computation();
            this.executed = true;
        }
        return this.result;
    }
}

const complexCalculation = () => {
     
    print("Performing complex calculation...");
    return [...Array(1000000).keys()].reduce((sum, x) => sum + Math.sqrt(x), 0);
};

const lazyValue = new LazyEvaluator(complexCalculation);

 
const handler = {
    get: (target, prop) => {
        if (prop === 'result') {
            print("Accessing result...");
            return target.evaluate();
        }
        return Reflect.get(...arguments);
    }
};

const proxy = new Proxy(lazyValue, handler);

 
async function performTasks() {
    const task1 = async () => {
        print('Task 1 start');
        await new Promise(res => setTimeout(res, 1000));
        print('Task 1 end');
    };

    const task2 = async () => {
        print('Task 2 start');
        await new Promise(res => setTimeout(res, 500));
        print('Task 2 end');
    };

    await Promise.all([task1(), task2()]);
}

(async () => {
     
    let { result: complexResult } = proxy;
    print("Complex Calculation Result:", complexResult);

    await performTasks();

    const map = new Map([['foo', 1], ['bar', 2]]);
    map.set('baz', 3);

     
    const set = new Set(['foo', 'bar', 'baz']);
    const array = [...set];
    print('Array from Set:', array);

    print('Map values:', [...map.values()]);

     
    const obj = { name: 'Alice', settings: { theme: 'dark' } };
    print('Theme:', obj.settings?.theme ?? 'default');
    print('Font size:', obj.settings?.fontSize ?? 'medium');
})();
