 
const defaultMap = (defaultVal) => new Proxy(new Map(), {
    get(target, prop) {
        if (!target.has(prop)) target.set(prop, defaultVal instanceof Function ? defaultVal() : defaultVal);
        return target.get(prop);
    }
});

 
async function* fetchData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

 
function safeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const val = values[i - 1];
        return result + String(val)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;') + str;
    });
}

(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const map = defaultMap(() => []);
    const dataGenerator = fetchData(urls);
    
    for await (const data of dataGenerator) {
        data.items.forEach(item => map[item.category].push(item));
    }

    const resultHTML = Object.entries(map).map(([category, items]) => {
        return safeHTML`
            <div>
                <h3>${category}</h3>
                <ul>
                    ${items.map(item => `<li>${item.name}</li>`).join('')}
                </ul>
            </div>
        `;
    }).join('');

    document.body.innerHTML = resultHTML;
})();
