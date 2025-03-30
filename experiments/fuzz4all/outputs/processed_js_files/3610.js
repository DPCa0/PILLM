 

class Reactive {
    constructor(obj) {
        return this.#makeReactive(obj);
    }

    #makeReactive(obj) {
        return new Proxy(obj, {
            get: (target, prop) => {
                if (typeof target[prop] === 'object' && target[prop] !== null) {
                    return new Proxy(target[prop], this.#getHandler());
                }
                return target[prop];
            },
            set: (target, prop, value) => {
                target[prop] = value;
                this.#updateUI(prop, value);
                return true;
            }
        });
    }

    #updateUI(key, value) {
        document.querySelectorAll(`[data-bind='${key}']`).forEach(el => {
            el.textContent = value;
        });
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

(async () => {
    const data = new Reactive({ title: "Loading...", description: "Please wait..." });
    
    document.body.innerHTML = `
        <h1 data-bind="title"></h1>
        <p data-bind="description"></p>
    `;
    
    try {
        const json = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        data.title = json.title;
        data.description = json.body;
    } catch (error) {
        data.title = "Error";
        data.description = error.message;
    }
})();
