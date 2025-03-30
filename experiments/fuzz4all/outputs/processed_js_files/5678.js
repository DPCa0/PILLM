(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = async () => {
    try {
      const [data1, data2] = await Promise.all([
        fetchData('https://api.example.com/data1'),
        fetchData('https://api.example.com/data2')
      ]);

      const mergedData = { ...data1, ...data2 };

      const result = Object.entries(mergedData)
        .filter(([key, value]) => typeof value === 'number')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value * 2 }), {});

      print('Processed Result:', result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  class CustomEventEmitter extends EventTarget {
    emit(eventType, detail) {
      this.dispatchEvent(new CustomEvent(eventType, { detail }));
    }

    on(eventType, callback) {
      this.addEventListener(eventType, callback);
    }
  }

  const emitter = new CustomEventEmitter();
  
  emitter.on('dataProcessed', (event) => {
    print('Event received:', event.detail);
  });

  await processData();
  emitter.emit('dataProcessed', { status: 'success' });
})();
